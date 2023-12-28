import pagination from "../components/pagination.js";
import delProductModal from "../components/delProductModal.js";
import productModal from "../components/productModal.js";

const { createApp, ref, onMounted } = Vue;

const app = createApp({
	components: {
		pagination,
		delProductModal,
		productModal,
	},
	setup() {
		const apiUrl = "https://ec-course-api.hexschool.io/v2/api",
			apiPath = "hexschool-billyji";
		const products = ref([]),
			tempProduct = ref({ imagesUrl: [] }),
			pagination = ref({}),
			productModal = ref(null),
			delProductModal = ref(null),
			fileUpLoading = ref(false),
			customFile = ref(null),
			tempUploadFiles = ref([]);

		let productModalHandle = ref(null),
			delProductModalHandle = ref(null);

		const getProducts = (page = 1) => {
			const api = `${apiUrl}/${apiPath}/admin/products?page=${page}`;
			axios
				.get(api)
				.then((res) => {
					products.value = res.data.products;
					pagination.value = res.data.pagination;
				})
				.catch((error) => {
					console.log(error);
				});
		};

		const checkAdmin = () => {
			const api = `${apiUrl}/user/check`;
			axios
				.post(api)
				.then((res) => {
					getProducts();
				})
				.catch((error) => {
					alert(`無此頁面權限，請重新登入。錯誤碼：${error}`);
					window.location = "login.html";
				});
		};

		const openModal = (status, product) => {
			if (status === "new") {
				tempProduct.value = {
					imagesUrl: [],
				};
				productModalHandle.value.show();
			} else {
				tempProduct.value = { ...product };

				status === "edit"
					? productModalHandle.value.show()
					: delProductModalHandle.value.show();
			}
		};

		const updateProduct = () => {
			let api = `${apiUrl}/${apiPath}/admin/product`;
			let httpMethod = "post";

			if (tempProduct.value.id) {
				api = `${apiUrl}/${apiPath}/admin/product/${tempProduct.value.id}`;
				httpMethod = "put";
			}

			axios[httpMethod](api, { data: tempProduct.value })
				.then((res) => {
					getProducts();
					productModalHandle.value.hide();
				})
				.catch((err) => {
					alert(err.response.data.message);
					productModalHandle.value.hide();
				});
		};

		const deleteProduct = () => {
			const api = `${apiUrl}/${apiPath}/admin/product/${tempProduct.value.id}`;
			axios
				.delete(api)
				.then((res) => {
					alert(res.data.message);
					getProducts();
					delProductModalHandle.value.hide();
				})
				.catch((err) => {
					alert(err.data.message);
					delProductModalHandle.value.hide();
				});
		};

		const addInitImages = () => {
			tempProduct.value.imagesUrl = [];
			tempProduct.value.imagesUrl.push("");
		};

		// 上傳圖片
		const uploadFileHandle = () => {
			fileUpLoading.value = true;
			const catchFile = customFile.value.files[0];
			const formData = new FormData();
			formData.append("file", catchFile);

			console.log(formData);

			const api = `${apiUrl}/${apiPath}/admin/upload`;
			axios
				.post(api, formData)
				.then((res) => {
					alert("檔案上傳成功");
					customFile.value.value = "";
					fileUpLoading.value = false;
					tempUploadFiles.value.push(res.data.imageUrl);
				})
				.catch((err) => {
					alert("檔案上傳失敗，請再檢查檔案大小是否過大");
					fileUpLoading.value = false;
				});
		};

		onMounted(() => {
			const token = document.cookie.replace(
				/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/,
				"$1"
			);

			axios.defaults.headers.common.Authorization = token;
			checkAdmin();

			productModalHandle.value = new bootstrap.Modal(productModal.value);
			delProductModalHandle.value = new bootstrap.Modal(delProductModal.value);
		});

		return {
			products,
			tempProduct,
			pagination,
			productModal,
			delProductModal,
			openModal,
			getProducts,
			updateProduct,
			deleteProduct,
			addInitImages,
			customFile,
			fileUpLoading,
			uploadFileHandle,
			tempUploadFiles,
		};
	},
});

app.mount("#app");

const { ref, toRefs } = Vue;
export default {
	template: `
    <div class="modal-dialog" role="document">
      <div class="modal-content border-0">
        <div class="modal-header bg-danger text-white">
          <h5 id="exampleModalLabel" class="modal-title">
            <span>刪除產品</span>
          </h5>
          <button type="button" class="btn-close btn-white" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          是否刪除
          <strong class="text-danger">{{ tempProduct.title }}</strong>
          商品(刪除後將無法恢復)。
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">
            取消
          </button>
          <button type="button" class="btn btn-danger" @click="handleDeleteClick">
            確認刪除
          </button>
        </div>
      </div>
    </div>
  `,
	props: {
		"temp-product": {
			type: Object,
		},
	},
	setup(props, { emit }) {
		const { tempProduct } = toRefs(props);

		const handleDeleteClick = () => {
			emit("delete-product");
		};

		return {
			tempProduct,
			handleDeleteClick,
		};
	},
};

const { ref, toRefs } = Vue;

export default {
	template: `
    <div class="modal-dialog modal-xl" role="document">
      <div class="modal-content border-0">
        <div class="modal-header bg-dark text-white">
          <h5 id="exampleModalLabel" class="modal-title">
            <span v-if="tempProduct.id">編輯 {{ tempProduct.title }}</span>
            <span v-else>新增產品</span>
          </h5>
          <button type="button" class="btn-close white" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body text-left">
          <div class="row">
            <div class="col-sm-4 mb-4">
              <div>
                <h6>主要圖片</h6>
                <div class="mb-3">
                  <label for="imageUrl" class="form-label">輸入圖片網址</label>
                  <input type="text" id="imageUrl" class="form-control" placeholder="請輸入圖片連結"
                    v-model="tempProduct.imageUrl">
                </div>
                <img class="img-fluid" :src="tempProduct.imageUrl" :alt="tempProduct.title">
              </div>
              <div class="mt-3">
                <h6>多圖新增</h6>
                <div v-if="Array.isArray(tempProduct.imagesUrl)">
                  <template class="mb-1" v-for="(image, key) in tempProduct.imagesUrl" :key="key + 'billy'">
                    <label for="image" class="form-label">圖片網址</label>
                    <input type="text" id="image" class="form-control" placeholder="請輸入圖片連結"
                      v-model="tempProduct.imagesUrl[key]">
                    <img class="img-fluid" :src="tempProduct.imagesUrl[key]">
                  </template>
                  <button
                    v-if="!tempProduct.imagesUrl.length || tempProduct.imagesUrl[tempProduct.imagesUrl.length - 1]"
                    type="button" class="btn btn-outline-primary btn-sm d-block w-100"
                    @click="tempProduct.imagesUrl.push('')">
                    新增圖片
                  </button>
                  <button v-else type="button" class="btn btn-outline-danger btn-sm d-block w-100"
                    @click="tempProduct.imagesUrl.pop()">
                    刪除圖片
                  </button>
                </div>
                <button v-else class="btn btn-outline-primary btn-sm d-block w-100" @click="handleAddImageClick">
                  新增圖片
                </button>
              </div>
            </div>
            <div class="col-sm-8">
              <div class="row">
                <div class="form-group mb-3 col-md-6">
                  <label for="title">標題</label>
                  <input id="title" v-model="tempProduct.title" type="text" class="form-control"
                    placeholder="請輸入標題" />
                </div>
                <div class="form-group mb-3 col-md-6">
                  <label for="numofPeople">人數</label>
                  <input id="numofPeople" v-model="tempProduct.numofPeople" type="number" class="form-control"
                    placeholder="請輸入人數" />
                </div>
              </div>
              <div class="row">
                <div class="form-group mb-3 col-md-6">
                  <label for="category">分類</label>
                  <input id="category" v-model="tempProduct.category" type="text" class="form-control"
                    placeholder="請輸入分類" />
                </div>
                <div class="form-group mb-3 col-md-6">
                  <label for="price">單位</label>
                  <input id="unit" v-model="tempProduct.unit" type="unit" class="form-control"
                    placeholder="請輸入單位" />
                </div>
              </div>
              <div class="row">
                <div class="form-group mb-3 col-md-6">
                  <label for="origin_price">原價</label>
                  <input id="origin_price" v-model="tempProduct.origin_price" type="number" class="form-control"
                    placeholder="請輸入原價" />
                </div>
                <div class="form-group mb-3 col-md-6">
                  <label for="price">售價</label>
                  <input id="price" v-model="tempProduct.price" type="number" class="form-control"
                    placeholder="請輸入售價" />
                </div>
              </div>
              <div class="row">
                <div class="form-group mb-3 col-md-6">
                  <label for="datetimeStart">課程開始時間</label>
                  <input id="datetimeStart" v-model="tempProduct.datetimeStart" type="datetime-local" class="form-control" />
                </div>
                <div class="form-group mb-3 col-md-6">
                  <label for="datetimeEnd">課程開始時間</label>
                  <input id="datetimeEnd" v-model="tempProduct.datetimeEnd" type="datetime-local" class="form-control" />
                </div>
              </div>
              <hr />
              <div class="form-group mb-3">
                <label for="description">產品描述</label>
                <textarea id="description" v-model="tempProduct.description" type="text" class="form-control"
                  placeholder="請輸入產品描述">
                </textarea>
              </div>
              <div class="form-group mb-3">
                <label for="content">說明內容</label>
                <textarea id="description" v-model="tempProduct.content" type="text" class="form-control"
                  placeholder="請輸入說明內容">
                </textarea>
              </div>
              <div class="form-group mb-3">
                <label for="notice">注意事項</label>
                <textarea id="notice" v-model="tempProduct.notice" type="text" class="form-control"
                  placeholder="請輸入注意事項">
                </textarea>
              </div>
              <div class="form-group">
                <div class="form-check">
                  <input id="is_enabled" v-model="tempProduct.is_enabled" class="form-check-input" type="checkbox"
                    :true-value="1" :false-value="0" />
                  <label class="form-check-label" for="is_enabled">是否啟用</label>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">
            取消
          </button>
          <button type="button" class="btn btn-primary" @click="handleUpdateClick">
            確認
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

		const handleAddImageClick = () => {
			emit("add-init-images");
		};
		const handleUpdateClick = () => {
			emit("update-product");
		};

		return {
			tempProduct,
			handleAddImageClick,
			handleUpdateClick,
		};
	},
};

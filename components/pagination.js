const { ref, toRefs } = Vue;
export default {
	template: `
    <nav class="mt-5">
      <ul class="pagination">
        <li class="page-item" :class="{disabled: pagination.has_pre === false}">
          <a class="page-link" href="#" @click.prevent="handlePageClick(pagination.current_page - 1)">Previous</a>
        </li>
        <li v-for="page in pagination.total_pages" :key="page" class="page-item"
          :class="{active: page === pagination.current_page}">
          <a class="page-link" href="#" @click.prevent="handlePageClick(page)">{{ page }}</a>
        </li>
        <li class="page-item" :class="{disabled: pagination.has_next === false}">
          <a class="page-link" href="#" @click.prevent="handlePageClick(pagination.current_page + 1)">Next</a>
        </li>
      </ul>
    </nav>
  `,
	props: {
		pagination: {
			type: Object,
		},
	},
	setup(props, { emit }) {
		const { pagination } = toRefs(props);

		const handlePageClick = (page) => {
			emit("get-products", page);
		};

		return {
			pagination,
			handlePageClick,
		};
	},
};

const { algoliasearch, instantsearch } = window;

const searchClient = algoliasearch(
  'RERDNK4DKF',
  '526aacdcea6748371ccb73098e3a87b6'
);

const search = instantsearch({
  indexName: 'products',
  searchClient,
});

search.addWidgets([
  instantsearch.widgets.searchBox({
    container: '#searchbox',
  }),

  instantsearch.widgets.clearRefinements({
    container: '#clear-refinements',
  }),

  instantsearch.widgets.refinementList({
    container: '#brand-list',
    attribute: 'brand',
  }),

  instantsearch.widgets.refinementList({
    container: '#category-list',
    attribute: 'category',
  }),

  instantsearch.widgets.hits({
    container: '#hits',
    templates: {
      item: `
        <div>
          <img src="{{image}}" align="left" alt="{{name}}" />
          <div class="hit-name">
            {{#helpers.highlight}}{ "attribute": "name" }{{/helpers.highlight}}
          </div>
          <div class="hit-description">
            {{#helpers.highlight}}{ "attribute": "description" }{{/helpers.highlight}}
          </div>
          <div class="hit-price">\${{price}}</div>
          <button class="product-detail-button" id="product-detail-11">Learn More</button>
        </div>
`,
    },
  }),
  instantsearch.widgets.configure({
    hitsPerPage: 8,
  }),
  
  instantsearch.widgets.pagination({
    container: '#pagination',
  }),
]);

function toggleDropdown() {
  var dropdownContent = document.querySelector(".dropdown-content");
  if (dropdownContent.style.display === "block") {
    dropdownContent.style.display = "none";
  } else {
    dropdownContent.style.display = "block";
  }
}

// Listen for the product detail button click
document.addEventListener('click', (event) => {
  if (event.target.classList.contains('product-detail-button')) {
    // Extract the product ID from the button's ID attribute
    const productId = event.target.id.replace('product-detail-', '');
    // Change the URL to include the product ID
    window.history.pushState({}, '', `product-detail.html?productId=${productId}`);
    // Fetch the product details and update the product information in the DOM
    getProductById(productId);
  }
});




search.start();

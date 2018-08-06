function ApiServiceClient() {
    this.searchApi=searchApi;
    this.detailSearch = detailSearch;
    var category;

    this.productUrl = 'http://webhose.io/productFilter?token=b2f6312c-2e61-4181-b715-3db973d12394&format=json&q=name%3Aproduct_name%20language%3Aenglish%20section_title%3Aproduct_title%20category%3Abooks';
    this.detailUrl = 'http://webhose.io/productFilter?token=b2f6312c-2e61-4181-b715-3db973d12394&format=json&q=name%3Aproduct_name%20category%3Aphone';
    var self=this;

    function searchApi(input, category) {


        var url;
        var replaced = input.split(' ').join('+');
        //console.log(replaced, category);
        if(category === 'books')
        {
            url = self.productUrl.replace("product_name", replaced)
                                     .replace("product_title",replaced);
        }
        else if(category === 'cars')
        {
            var carUrl = 'http://webhose.io/productFilter?token=b2f6312c-2e61-4181-b715-3db973d12394&format=json&q=name%3Aproduct_name%20category%3Acars'
             url = carUrl.replace("product_name", replaced);
        }
        else if(category === 'cell-phones-smartphones')
        {
            url = self.productUrl.replace("product_name", replaced)
                                     .replace("product_title",replaced)
                                     .replace("books", "cell-phones-smartphones");
        }

        console.log(url);

        return fetch(url).then(function (response) {
            return response.json();

        })
    }

    function detailSearch(name, category) {
        //console.log(product_id);
        console.log(category);
        var replaced = name.split(' ').join('+');
        var url = self.detailUrl.replace("product_name", replaced)
            .replace("phone", category);
        return fetch(url).then (function (response) {

            return response.json();

        });

    }
}
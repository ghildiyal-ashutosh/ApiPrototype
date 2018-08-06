(function () {
    $(main);
    var $category, $pname;
    var $productRowTemplate, $productRowTemplate2;
    var $tbody, $tbody2;
    var service;

    function main() {
        $('#searchFld').click(callApi);
        $tbody = $('.productBody');
        $tbody2 = $('.tbody2');
        service= new ApiServiceClient();
        $productRowTemplate = $('.productRowTemplate');
        $productRowTemplate2 = $('.productRowTemplate2');
    }

    function callApi() {
        var input = $('#inputFld').val();
        var category = $('#selectFld').val();
        if(input!=="" && category!=="")
        {
            $category=category;
            service.searchApi(input, category).then(renderResults);
        }
        else
            alert("Please enter search input and category.");
    }

    function detailSearch(event) {
        //console.log(event);
        service.detailSearch(findProductName(event), $category).then(renderProduct);
    }

    function findProductName(event) {
      //  var position = $(event.currentTarget);
        //console.log(event);

        //console.log(event.currentTarget.parentNode.previousSibling.previousSibling.previousSibling);

    //    var product_id = position.parent().parent().parent().attr('id');

        //console.log(product_id);
    //    var id = event.currentTarget.parentNode.id;
        var name = event.currentTarget.parentNode.parentNode.id;
        $pname = name;
        return name;
       // return id;
    }

    function renderResults(response) {
        //console.log(response);
        $tbody.empty();

        for(var i=0; i<response.products.length; i++)
        {
            var product=response.products[i];
            var clone = $productRowTemplate.clone();
            clone.attr('id', product.name);
            //clone.attr('name', product.name);
            clone.find('.pName').html(product.name);
            clone.find('.detailBtn').click(detailSearch);
            clone.find('.pPrice').html( product.price);
            clone.find('.pOfferedPrice').html( product.offer_price);
            clone.find('.pRating').html( product.aggregated_rating);

            $tbody.append(clone);
        }
    }

    function renderProduct(response) {
    let results = ( response.products.filter(
            product => product.name === $pname
        ))
        $tbody.empty();
        $tbody2.empty();
        for(var i = 0; i<results.length; i++)
        {
            var result = results[i];
            var clone = $productRowTemplate2.clone();
            clone.find('.proName').html(result.name);
            clone.find('.proDesc').html(result.description);
            $tbody2.append(clone);


        }

//$('#searchFld').click(callApi);

      //  conole.log(product);
   // renderResults(product);
    }

})
();

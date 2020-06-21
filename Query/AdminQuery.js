$(document).ready(() => {
    $('#addJewels').click(() => {
        data = `<input id="fileUpload" type="file" accept=".jpeg, .png, .jpg, .gif">
        
        <div class="container">
            <b class="imageUrl">Image Url</b>
            <p id="base64"></p>
        </div>
        
        <div class="container">
            <select id="karat">
                <option value="Null">Select Karat Value</option>
                <option value="18k">18 Karat</option>
                <option value="21k">21 Karat</option>
            </select>

            <select id="jewelType">
                <option value="Null">Select Jewel Type</option>
                <option value="SPL">SPL</option>
                <option value="VSPL">VSPL</option>
                <option value="W/Pearl">With Pearl</option>
            </select>

            <label for="name">Product Name</label>
            <input type="text" id="name" placeholder="Enter Product Name...">

            <label for="price">Price</label>
            <input type="number" id="price" min="1" placeholder="Enter Price...">
        </div>

        <div class="container">
            <button type="button" id="save" class="btn btn-primary">Submit</button>
        </div>`;
        
        $('#pageData').empty();
        $('#pageData').append(data);

        $(document).on('change', '#pageData', () => {
            $('b').css('text-align', 'center');
        });

        $(document).on('change', '#fileUpload', function(event) {
            // console.log(event);
            const reader = new FileReader();
            reader.readAsDataURL(event.currentTarget.files[0]);
            const me = this;
            reader.onload = function () {
              const fileContent = reader.result;
              $("#base64").append(fileContent).css('text-align', 'center');
            }
        });

        $(document).on('click', '#save', () => {
            const karat = $('#karat').val();
            const jewelType = $('#jewelType').val();
            const productName = $('#name').val();
            const price = $('#price').val();
            const base64 = $('#base64').text();

            $.ajax({
                url: 'http://Localhost:1010/New-Product',
                method: 'POST',
                data: {karat: karat, jewelType: jewelType, productName: productName, price: price, base64: base64},
                dataType: 'text'
            }).done((data) => {
                if (data == 'Save') {
                    alert('Product is now Added');
                    return;
                }
                else if (data == 'Present') {
                    alert('Product is Present in the Database');
                    return;
                }
                alert('ERROR!!!!');
            });

        });
    });
});
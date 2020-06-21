$(document).ready(function() {
    $('#submitJewel').click(function() {
        const base64Image = $('#base64').text();
        // console.log(base64Image);
        $.ajax({
            url: 'http://Localhost:1010/Saving',
            method: 'POST',
            data: {base64Image: base64Image},
            dataType: 'text'
        }).done((data) => {
            if (data == undefined) {
                alert('ERROR!!!');
                return;
            }
            else if (data == 'Present') {
                alert('Product is present at the Database!!');
                return;
            }
            alert('Product Saved!');
        });
        // $('input[type=file]').change(function () {
        //     console.log(this.files[0].mozFullPath);
        // });
    });
});
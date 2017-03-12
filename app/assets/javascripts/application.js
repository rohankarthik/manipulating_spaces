// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/sstephenson/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require turbolinks
//= require_tree .



$(document).ready(function() {

    $('#submit').on('click', function (e) {
        e.preventDefault();

        var input_text = $('#input_text').val();
        var corrected_text = $('#corrected_text');
        var metadata = $('#metadata');
        var error_text = $('#error_text');

        if(isEmpty(input_text)) {
            error_text.addClass("error");
            error_text.text("Please enter a few sentences followed by period.");
            error_text.show();

            corrected_text.hide();
            metadata.hide();
        }
        else
        {
            error_text.hide();

            $.ajax({
                method: "POST",
                dataType: 'json',
                url: "/sentences",
                data: {input_text: input_text},
                success: function (data) {
                    show_response(data);
                },
                error: function() {
                    error_text.show();
                    error_text.text('Error');
                }
            })

        }

    });

    function isEmpty(fieldValue) {
        return $.trim(fieldValue).length == 0;
    }

    function show_response(data){
        $('#corrected_text').text("Corrected Sentences  -->  " + data.corrected_text);
        $('#metadata').text("The change made to the supplied input -->  " + data.metadata);

        $('#corrected_text').show();
        $('#metadata').show();
    }

});
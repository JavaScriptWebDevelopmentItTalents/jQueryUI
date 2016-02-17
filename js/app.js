$( "#startDate" ).datepicker();

$( "#endDate" ).datepicker();

$.validator.addMethod(
    "bulgarianDate",
    function(value) {
        return value.match(/^\d\d?\/\d\d?\/\d\d\d\d$/);
    },
    "Please enter a date in the format dd/mm/yyyy."
);

$.validator.addMethod(
    "maxVacation",
    function() {
        //Takes the data strings from both start and end date input fields, makes new date with constructor
        //that takes string as argument, then takes unix time from them.
        //Substracts both unix times and then divides by that magical number to get the days.
        //Checks if the days are equal than 3. Returns true if that condition is met and false otherwise.
        var days = ((new Date($('#endDate')[0].value).getTime() - new Date($('#startDate')[0].value).getTime()) / 86400000);
        return  days === 3;
    },
    "Vacation should be 3 days no more. :( :( :("
);

$('form').validate({
    submitHandler: function(form) {
        alert('Transfering additional 200$ from your credit card to... OOPS!!!');
        form.submit();
    },
    rules: {
        startDate: {
            required: true,
            bulgarianDate: true,
            maxVacation : true
        },
        endDate: {
            required: true,
            bulgarianDate: true,
            maxVacation: true
        }
    }
});

$('li').draggable(
    { revert: true }
);

var counter = 0;
$('#droppable').droppable({
    activeClass: "ui-state-default",
    hoverClass: "ui-state-hover",
    drop: function( event, ui ) {
        counter += 1;
        if(counter <= 3){
            $( "<li></li>" ).text( ui.draggable.text() ).appendTo( this );
        }
    }
}).sortable({
    sort: function() {
        $( this ).removeClass( "ui-state-default" );
    }
});


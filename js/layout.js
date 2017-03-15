$(document).ready(function(){
    $('.btn-list, .btn-sum').click(function(){
        if($(this).hasClass('btn-list')){
            $('.bill-table').toggleClass('hidden');
            if(!$('.bill-sum-list').hasClass('hidden')) $('.bill-sum-list').addClass('hidden');            
        } 

        if($(this).hasClass('btn-sum')) {
            $('.bill-sum-list').toggleClass('hidden');
            if(!$('.bill-table').hasClass('hidden')) $('.bill-table').addClass('hidden');
        }
    })
});
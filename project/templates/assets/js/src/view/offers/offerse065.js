function urlTitle(s) {
	if(!s || s.length == 0) return '';
    kaSymbols = ['/ა/','/ბ/','/გ/','/დ/','/ე/','/ვ/','/ზ/','/თ/','/ი/','/კ/','/ლ/','/მ/','/ნ/','/ო/','/პ/','/ჟ/','/რ/','/ს/',
                        '/ტ/','/უ/','/ფ/','/ქ/','/ღ/','/ყ/','/შ/','/ჩ/','/ც/','/ძ/','/წ/','/ჭ/','/ხ/','/ჯ/','/ჰ/','/ხ/','/ც/','/ძ/'];
    enSymbols = ['a','b','g','d','e','v','z','t','i','k','l','m','n','o','p','j','r','s',
                       't','u','f','q','r','y','sh','ch','c','z','w','W','x','j','h','kh','ts','dz'];

    s = s.replace(/,/, '');
    s = s.replace(/(\/)|\s/, '-');
    s = s.replace(/-+/, '-');
    s = s.replace(/^[-\s]+|[-\s]+$/, '');

    return s;
}

function typeTitle(t) {
	return (parseInt(t) == 2) ? 'გარე-ტურები' : 'შიდა-ტურები';
}

var Filter = {
	sl1: 0,
	sl2: 10000,
	catsList : {},
	validCat : function(cat) {
		if(parseInt($('#sel-cat').val()) == 0) return true;
		var catID 		= parseInt($('#sel-cat').val());
		var subCatID 	= parseInt($('#sel-sub-cat').val());
			if(parseInt(subCatID) == 0) return true;
			// if(parseInt(subCatID) == 0) {
			// 	if(Filter.catsList[catID]) {
			// 		subCats = Filter.catsList[catID];
			// 	} else {
			// 		subCats = [catID];
			// 		$('#sel-sub-cat option[data-parent="'+catID+'"]').each(function(){ subCats.push(parseInt($(this).val())); });
			// 		Filter.catsList[catID] = subCats;
			// 	}
			// 	return (subCats.indexOf(cat) > -1);
			// }
			return (subCatID == cat);
	},
	renderCatTitle : function() {
		$('#offers-category-title').html($('#sel-cat option:selected').data('metatitle'));
	},
	setUrl : function() {
		let catID  = $('#sel-cat').val();
		let cTitle = $('#sel-cat option:selected').data('title');
		let u 	   = decodeURI(location.href);	
			u 	   = u.replace(/\/[ა-ჰ-]+\/\d{1,4}$/, '/' + urlTitle(cTitle) + '/' + catID);
			history.replaceState(null, null, u);
			// document.title = 
	},
	redirect : function() {
		var catID  = $('#sel-cat').val();
		var typeID = $('#sel-cat').data('type'); 
		var cTitle = $('#sel-cat option:selected').data('title');
		var mTitle = $('#sel-cat option:selected').data('metatitle');
			window.location = URI + (typeTitle(typeID)) + '/' + typeID + '/' + urlTitle(cTitle) + '/' + catID;
	},
	check: function() {
		var catID = $('#sel-cat').val(); 
		var Days  = $('#Days-inp').val();
		var sl1   = this.sl1;
		var sl2   = this.sl2;
			if(catID > 0) {
				// Filter.setUrl();
				// Filter.renderCatTitle();
			}
			$('#sel-sub-cat option').not('[value="0"]').hide();
			if(catID > 0 && $('#sel-sub-cat option[data-parent="'+catID+'"]').length > 0) {
				$('#sel-sub-cat').parent().removeClass('d-none');
				$('#sel-sub-cat option[data-parent="'+catID+'"]').show();
			} else {
				$('#sel-sub-cat').parent().addClass('d-none');
			}

		if(catID == 0 && Days == 1) {
			$('.tour-item').each(function(i,option){
		        if($(this).data('minprice') > Number(sl1) && $(this).data('maxprice') < Number(sl2)){
		            $(this).show();
		        } else {
		            $(this).hide();
		        }
		    });
		}

		else if (catID == 0 && Days > 1) {
			$('.tour-item').each(function(i,option){
		        if($(this).data('days') < Days && $(this).data('minprice') > Number(sl1) && $(this).data('maxprice') < Number(sl2)){
		            $(this).show();
		        }else {
		            $(this).hide();
		        }
		    });
		}

		else if (catID > 0 && Days == 1) {
			$('.tour-item').each(function() {
				// if($(this).data('cat') == catID && $(this).data('minprice') > Number(sl1) && $(this).data('maxprice') < Number(sl2)){
				if(Filter.validCat(parseInt($(this).data('cat'))) && $(this).data('minprice') > Number(sl1) && $(this).data('maxprice') < Number(sl2)){
				// if($(this).data('minprice') > Number(sl1) && $(this).data('maxprice') < Number(sl2)){
		            $(this).show();
		        }else {
		            $(this).hide();
		        }
			});
		}

		else if (catID > 0 && Days > 1) {
			$('.tour-item').each(function() {
				// if($(this).data('days') < Days && $(this).data('cat') == catID && $(this).data('minprice') > Number(sl1) && $(this).data('maxprice') < Number(sl2)){
				if($(this).data('days') < Days && Filter.validCat(parseInt($(this).data('cat'))) && $(this).data('minprice') > Number(sl1) && $(this).data('maxprice') < Number(sl2)){
				// if($(this).data('days') < Days && $(this).data('minprice') > Number(sl1) && $(this).data('maxprice') < Number(sl2)){
		            $(this).show();
		        }else {
		            $(this).hide();
		        }
			});
		} 
	}
}
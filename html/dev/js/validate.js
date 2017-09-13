+function($){
  'use strict';

  var validate = (function(){

    var regexes = {
      required: /[\s\S]+/i,
      email: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
      // rule = /^(.+?)\[(.+)\]$/,
      numeric : /^[0-9]+$/,
      integer : /^\-?[0-9]+$/,
      decimal : /^\-?[0-9]*\.?[0-9]+$/,
      alpha : /^[a-z\s]+$/i,
      alphaNumeric : /^[a-z0-9]+$/i,
      alphaDash : /^[A-Za-z_]+$/i,
      natural : /^[0-9]+$/i,
      naturalNoZero : /^[1-9][0-9]*$/i,
      ip : /^((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){3}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})$/i,
      base64 : /[^a-zA-Z0-9\/\+=]/i,
      numericDash : /^[\d\-\s]+$/,
      url : /^((http|https):\/\/(\w+:{0,1}\w*@)?(\S+)|)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?$/,
      date : /\d{4}-\d{1,2}-\d{1,2}/,
      lessThan15 : /^.{1,15}$/i,
      lessThan30 : /^.{1,30}$/i,
      lessThan40 : /^.{1,40}$/i,
      lessThan80 : /^.{1,80}$/i,
      lessThan128 : /^.{1,128}$/i,
      generalNoShowWords : /Packstation|Postfach|(P\.?O[\. ]BOX)|(PO\. BOX)|(P\.O\. BOX)/i,
      emptyOrLessThan64: /^.{0,64}$/i,
      usCityNoShowWords : /APO|DPO|FPO/,
      usStateNoShowWords : /VI|Virgin Islands|GU|Guam/i,
      usZipCode: /^[0-9]{5}$|^[0-9]{5}\-[0-9]{4}$/,
      gbZipCode: /^(?!JE|GY).{1,10}$/,
      gbZipCode_rule1: /^[a-zA-Z][a-zA-Z]{0,1}[0-9]{1,2}\s[0-9][a-zA-Z]{2}$/,
      gbZipCode_rule2: /^[a-zA-Z][a-zA-Z]{0,1}[0-9][a-zA-Z]\s[0-9][a-zA-Z]{2}$/,
      generalZipCode: /^[0-9a-z \-]{1,12}$/i,
      telephoneDigit : /^[0-9\-\+\(\)\s]{7,}$/,
      idcardLast6Number : /^([0-9]|[a-zA-Z]){6}$/
    };

    var validateDic = {
      'notEmpty':{
        regex: [regexes.required],
        hint: 'This is a required field'
      },
      'idcardLast6Number' : {
        regex : [regexes.idcardLast6Number],
        hint : '请输入正确格式的身份证后6位'
      },
      'email': {
        regex: [regexes.email],
        hint: 'Please fill in a correct email'
      },
      'number': {
        regex: [regexes.numeric],
        hint: 'Please fill in a correct number'
      },
      'numberAndEnglish': {
        regex: [regexes.alphaNumeric],
        hint: 'Please fill in a correct mix of number and English'
      },
      'english': {
        regex: [regexes.alphaDash],
        hint: 'Please fill in English'
      },

      'us_addressName': {
        regex: [regexes.alphaDash],
        hint: 'Please fill in English'
      },

      'addressName': {
        regex: [regexes.lessThan30],
        hint: 'The length of the first name and last name combination should be less than 30 characters'
      },
      'name': {
        regex: [regexes.lessThan30],
        hint: 'Please fill in the field with less than 30 characters'
      },
      'addressCity': {
        regex: [regexes.required],
        not_regex: [regexes.generalNoShowWords],
        hint: 'Incorrect city or cannot be shipped to'
      },
      '_us_addressCity': {
        regex: [regexes.required],
        not_regex: [regexes.generalNoShowWords, regexes.usCityNoShowWords],
        hint: 'Incorrect city or cannot be shipped to'
      },
      '_gb_addressCity': {
        regex: [regexes.lessThan40,regexes.alpha],
        not_regex: [regexes.generalNoShowWords],
        hint: 'Incorrect city or cannot be shipped to'
      },
      'addressZipCode': {
        regex: [regexes.required,regexes.generalZipCode],
        not_regex: [regexes.generalNoShowWords],
        hint: 'Zipcode less than 12 characters required'
      },
      
      '_hk_addressZipCode' : {
        regex : [regexes.emptyOrLessThan64],
        hint: 'Zipcode keep empty or less than 12 characters'
      },
      '_us_addressZipCode': {
        regex: [regexes.required,regexes.usZipCode],
        not_regex: [regexes.generalNoShowWords],
        hint: 'Required and must be a format of 00000 or 00000-0000'
      },
      '_gb_addressZipCode': {
        regex: [regexes.gbZipCode,regexes.gbZipCode_rule1,regexes.gbZipCode_rule2],
        not_regex: [regexes.generalNoShowWords],
        hint: 'Should not be real UK zipcode and cannot begin with JE or GY'
      },
      'addressState': {
        regex: [regexes.emptyOrLessThan64],
        not_regex: [regexes.generalNoShowWords],
        hint: 'Incorrect state/province or cannot be shipped to'
      },
      '_gb_addressState': {
        regex: [regexes.lessThan15],
        not_regex: [regexes.generalNoShowWords],
        hint: 'Incorrect state/province or cannot be shipped to'
      },
      '_us_addressState': {
        regex: [regexes.required],
        not_regex: [regexes.generalNoShowWords, regexes.usStateNoShowWords],
        hint: 'Incorrect state/province or cannot be shipped to'
      },
      '_de_addressState': {
        regex: [regexes.required],
        not_regex: [regexes.generalNoShowWords],
        hint: 'Incorrect state/province or cannot be shipped to'
      },
      'addressCompany': {
        regex: [regexes.emptyOrLessThan64],
        not_regex: [regexes.generalNoShowWords],
        hint: 'company length no more than 64 characters'
      },

      'addressStreet': {
        regex: [regexes.lessThan128],
        not_regex: [regexes.generalNoShowWords],
        hint: 'Incorrect street or cannot be shipped to'
      },
      '_gb_addressStreet': {
        regex: [regexes.lessThan80],
        not_regex: [regexes.generalNoShowWords],
        hint: 'Incorrect street or cannot be shipped to'
      },
      'addressPhone': {
        regex: [regexes.required,regexes.telephoneDigit],
        not_regex: [regexes.generalNoShowWords],
        hint: 'Incorrect phone or cannot be shipped to'
      },
      '_gb_addressPhone': {
        regex: [regexes.telephoneDigit,regexes.lessThan15],
        not_regex: [regexes.generalNoShowWords],
        hint: 'Incorrect phone or cannot be shipped to'
      },
      
      'password': {
        regex: [regexes.required],
        hint: '请输入密码'
      },
      //support - submit a ticket
      'ticketSubject':{
        regex: [regexes.required],
        hint: 'Please fill in a subject'
      },
      'ticketCategory':{
        regex: [regexes.required],
        hint: 'Please choose a proper category'
      },
      'ticketIssue':{
        regex: [regexes.required],
        hint: 'Please choose a proper issue'
      },
      'ticketOrder':{
        regex: [regexes.required],
        hint: 'Please choose the relavent order'
      },
      'ticketIMEI': {
        regex: [regexes.required],
        hint: 'Please fill in the phone IMEI number'
      },
      'ticketDetails': {
        regex: [regexes.required],
        hint: 'Please describe the issue in detail'
      },
      'invitePiece': {
        regex: [regexes.required],
        hint: ''
      }
    };

    // function _validateRules(rule) {
    //   switch(rule){
    //     case 'notEmpty':
    //     case 'invitePiece':
    //       return {
    //         regex: /[0-9A-Zz-z]{4}/i,
    //         hint: ''
    //       }
    //   }
    // }

    function _validate($input, isEmptyAllowed) {
      var validateType = $input.attr('data-type');
      var validateDicItem = validateDic[validateType] || validateDic[validateType.split('_').pop()];
      if(typeof validateDicItem === 'undefined') {
        // console.log('Validation rule not defined')
        return false;
      }

      var value = $input.val();

      var isNotValid = false;

      if(value.length <= 0 && isEmptyAllowed) {
        isNotValid = false;
      }else {
        // if(typeof validateDicItem.regex[0] === 'undefined') {
        //   console.log('start');
        // }
        isNotValid = !_cascadeRegexTest(validateDicItem.regex, validateDicItem.not_regex, value) || ($input.is('select') && ($input.val() < 0 || $input.val() == 'none'));
      }

      if(isNotValid){

        if($input.next('.field-hint').length){
          $input.next('.field-hint').text(validateDicItem.hint);
          $input.next('.field-hint').attr('data-title',validateDicItem.hint);
        }else {
          $('<span class="field-hint" data-title="'+validateDicItem.hint+'">' + validateDicItem.hint + '</span>').insertAfter($input);
        }
        $input.addClass('invalid');
        return false;

      }else {
        $input.next('.field-hint').remove();
        $input.removeClass('invalid');
        return true;
      }
    }

    function _validateCombination ($combination) {
      var validateType = $combination.attr('data-type');
      var validateDicItem = validateDic[validateType] || validateDic[validateType.split('_').pop()];
      if(typeof validateDicItem === 'undefined') {
        // console.log('Validation rule not defined')
        return false;
      }

      var value = '';
      var $inputs = $combination.find('.form-control:visible');
      for(var i=0; i<$inputs.length; i++) {
        value += $inputs.eq(i).val();
      }

      var isNotValid = false;

      isNotValid = !_cascadeRegexTest(validateDicItem.regex,validateDicItem.not_regex,value);

      if(isNotValid){

        $combination.find('.combination-hint').text(validateDicItem.hint).show();
        $inputs.addClass('invalid');

        return false;

      }else {
        $combination.find('.combination-hint').hide();
        return true;
      }
    }

    function _cascadeRegexTest (regexes,not_regexes,value) {

      var isValid = true;
      if(typeof regexes !== 'undefined') {
        for(var i = 0; i < regexes.length; i++) {
          if(typeof regexes[i] === 'undefined') {
            console.log('xxx');
          }
          isValid = isValid && regexes[i].test(value);
          if(!isValid) {
            break;
          }
        }
      }


      if(typeof not_regexes !== 'undefined' && isValid) {
        for(var i = 0; i < not_regexes.length; i++) {
          isValid = isValid && (!not_regexes[i].test(value));
          if(!isValid) {
            break;
          }
        }

      }

      return isValid;

    }

    // function _parallelRegexTest (regexes,value) {

    //   var isValid = true;

    //   for(var i = 0; i < regexes.length; i++) {
    //     isValid = isValid || regexes[i].test(value);
    //     if(!isValid) {
    //       break;
    //     }
    //   }

    //   return isValid;

    // }

    function _validateOnBlur ($input) {

      $input.val($.trim($input.val()));

      var allowEmpty = true;
      return _validate($input, allowEmpty);
    }

    var _validateOnSubmit = function($input){
      var allowEmpty = false;
      return _validate($input, allowEmpty);
    };

    $(document).on('blur','.form-group.required .form-control',function(){
      var $this = $(this);
      _validateOnBlur($this);
    });

    //All required inputs will be validated before an ajax request is fired,
    //if all inputs are valid, an event "inputValidated.oneplus" will be triggered on the same input
    $(document).on('click','.js-ajax-submit', function(event){
      event.preventDefault();
      event.stopPropagation();

      var $this = $(this);
      var $form = $this.parents('form').eq(0);
      var $inputs = $form.find('.form-group.required .form-control:visible');
      var isValid = true;
      for(var i=0; i<$inputs.length; i++) {
        var $input = $inputs.eq(i);
        isValid = isValid && _validateOnSubmit($input);
      }

      var $combinations = $form.find('.combination-control');
      for(var i=0; i<$combinations.length; i++) {
        var $combination = $combinations.eq(i);
        isValid = isValid && _validateCombination($combination);
      }

      if(isValid){
        $this.trigger('inputValidated.liuxian');
        $this.attr('disabled',true);
        setTimeout(function(){
          $this.attr('disabled',false);
        },800)
      }
    });

    $(document).on('click','.js-auto-submit', function(event){
      event.preventDefault();
      event.stopPropagation();

      var $this = $(this);
      var $form = $this.parents('form').eq(0);
      var $inputs = $form.find('.form-group.required .form-control:visible');
      var isValid = true;
      for(var i=0; i<$inputs.length; i++) {
        var $input = $inputs.eq(i);
        isValid = isValid && _validateOnSubmit($input);
      }

      var $combinations = $form.find('.combination-control');
      for(var i=0; i<$combinations.length; i++) {
        var $combination = $combinations.eq(i);
        isValid = isValid && _validateCombination($combination);
      }

      if(isValid){
        $form.submit();
      }

    });

    $(document).on('click','[type=reset]',function(event){
      $(this).parents('form').eq(0).find('.form-control').removeClass('invalid');
    });

  })();


}(jQuery);

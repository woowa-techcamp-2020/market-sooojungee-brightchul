import $fetch from './fetch.js';

let pw = null;
let ph = false;

const validator = new function() {
  this.userid = async function(value) {
    const check = /^[\_\-a-z0-9]{4,20}$/;
    if (value.length === 0) {
      return this.reject('아이디를 입력해 주세요.');
    } else if (!check.test(value)) {
      return this.reject('아이디는 영소문자와 숫자, 특수기호(_, -)로 4자~20자 사이로 입력해 주세요.');
    }
    const result = await $fetch.checkId(value);
    return result;
  }

  this.password = function (value) {
    const check = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,20}$/;
    if (value.length < 8 || !check.test(value)) {
      return this.reject('비밀번호는 영문과 숫자를 포함하여 8~20자로 입력해 주세요.');
    } else {
      pw = value;
      return this.resolve();
    }
  }

  this.check_password = function(value1) {
    if(!pw) return this.reject('비밀번호 확인을 위해 한번 더 입력해 주세요');
    if (value1.length === 0 && this.password.length === 0) {
      return this.reject('비밀번호 확인을 위해 한번 더 입력해 주세요');
    } else if (value1 === pw) {
      return this.resolve();
    } else {
      return this.reject('위 비밀번호와 일치하지 않습니다. 다시 입력해 주세요.');
    }
  }

  this.email_id = function(value) {
    const check = /^[A-Za-z0-9+]*$/;
    if(value.length === 0) {
      return this.reject('이메일 주소를 입력해 주세요.');
    } else if (!check.test(value)) {
      return this.reject('이메일 주소를 확인해 주세요.');
    }
    return this.resolve();
  }

  this.email_domain = function(value) {
    if (value.length === 0) {
      return this.reject('이메일 주소를 입력해 주세요.');
    }
    return this.resolve();
  }

  this.name = function(value) {
    const check = /[0-9~!@#$%^&*()_+|<>?:{}]/;
    if (value.length === 0) {
      return this.reject('이름을 입력해 주세요.');
    } else if (value.length < 2) {
      return this.reject('2자 이상으로 입력해 주세요.');
    } else if (check.test(value)) {
      return this.reject('이름에 특수문자, 숫자는 입력하실 수 없습니다. 다시 입력해 주세요.');
    }
    return this.resolve();
  }

  this.phone = function(value) {
    const check = /^01([0|1|6|7|8|9]?)-?([0-9]{3,4})-?([0-9]{4})$/;
    if (value.length === 0) {
      return this.reject('휴대폰 번호를 입력해 주세요.');
    } else if (!check.test(value)) {
      return this.reject('휴대폰 번호를 확인해 주세요.');
    }
    return this.resolve();
  }

  this.advcheck = function(value) {
    if (value) {
      return this.resolve(true);
    } else {
      return this.resolve(false);
    }
  }

  this.postcode = function(value) {
    return this.resolve();
  }

  this.address1 = function(value) {
    return this.resolve();
  }

  this.address2 = function(value) {
    return this.resolve();
  }

  this.essential = function(value) {
    if (value) {
      return this.resolve(true);
    } else {
      return this.reject(false);
    }
  }

  this.check_num = function(value) {
    if (value.length > 0) {
      return this.resolve();
    } else {
      return this.reject('인증번호를 입력해 주세요.');
    }
  }

  this.assign_num = function(value) {
    if (value.length === 6) {
      ph = true;
      return this.resolve();
     }  else {
      return this.reject('인증번호를 확인해 주세요.');
     }
  }

  this.confirm_number = function(value) {
    if (ph) {
      return this.resolve();
    } else {
      return this.reject('휴대폰 번호를 확인해 주세요.');
    }
  }

  this.resolve = function(message = '') {
    return {
      success: true,
      message
    }
  }

  this.reject = function(message) {
    return {
      success: false,
      message
    };
  }
}

export default validator;

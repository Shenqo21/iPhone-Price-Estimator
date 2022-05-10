class Phone {
  constructor(json) {
    Object.assign(this, json);
    console.log(this);
  }

  getModel() {
    return this.model;
  }

  getNewPrice() {
    return this.newPrice;
  }

  getUsedGoodPrice() {
    return this.usedGoodPrice;
  }

  getScratchFee() {
    return this.scratchFee;
  }

  getCrackedScreenFee() {
    return this.crackedScreenFee;
  }
}

const phonePriceData = [
  {
    model: "iPhone 6 Plus",
    newPrice: "null",
    usedGoodPrice: "55",
    scratchFee: "10",
    crackedScreenFee: "25",
  },
  {
    model: "iPhone 6S Plus",
    newPrice: "70",
    usedGoodPrice: "65",
    scratchFee: "10",
    crackedScreenFee: "30",
  },
  {
    model: "iPhone 7",
    newPrice: "null",
    usedGoodPrice: "null",
    scratchFee: "10",
    crackedScreenFee: "30",
  },
  {
    model: "iPhone 7 Plus",
    newPrice: "100",
    usedGoodPrice: "90",
    scratchFee: "15",
    crackedScreenFee: "30",
  },
];

//order is
/* [0:new with box, 
    1:used-good, 
    2:scratches, 
    3:cracked back, 
    4:cracked screen, 
    5:icloud locked, 
    6:black screen] */
let conditionData = [];

$(document).ready(function () {
  phonePriceData.forEach((phoneJSON) => {
    let newPhone = new Phone(phoneJSON);
    console.log(newPhone + "\nObject Created");
    console.log(newPhone.getModel());
    $("#model-selection").append(
      `<option value="${newPhone}">${newPhone.getModel()}</option>`
    );
  });
});

//calculates price
function calculatePrice() {
  if ($("#new-check").val()) {
    return $("#model-selection").find(":selected").val().getNewPrice();
  } else if ($("#used-good").val()) {
    return $("#model-selection").val().getUsedGoodPrice();
  } else {
      let price = $('#model-selection').val().getUsedGoodPrice();
    if ($("#scratches").val()) {
        price -= $('#model-selection').val().getScratchFee();
    }
    if ($("#cracked-back").val()) {
        //cracked back disclaimer - also display price?
        return 'Back Crack Explanation'
    }
    if($("#cracked-screen").val()&&$("#icloud-locked").val())

    if ($("#cracked-screen").val()) {
        if ($("#icloud-locked").val()) {
            return "Not Buying"
        }
        price -= $('#model-selection').val().getCrackedScreenFee();
    }
    if($("#icloud-locked").val()&&!$('#cracked-screen').val())
    {
        return $('#model-selection').val().getCrackedScreenFee()/2;
    }
    if ($("#black-screen").val()) {
        return 'Contact/Explanation';
    }
  }
}

function displayPrice() {
    console.log(calculatePrice());
}

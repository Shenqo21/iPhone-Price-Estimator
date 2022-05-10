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

$(document).ready(function () {
  phonePriceData.forEach((phoneJSON,index) => {
    $("#model-selection").append(
      `<option value="${index}">${phoneJSON.model}</option>`
    );
  });
});

//calculates price
function calculatePrice() {
  if ($("#new-check").val()) {
    return phonePriceData[$("#model-selection").find(":selected").val()].newPrice;
  } else if ($("#used-good").val()) {
    return phonePriceData[$("#model-selection").find(":selected").val()].usedGoodPrice;
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

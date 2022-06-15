var contactStatement = "I want to buy your phone!! But I don’t have enough info about it, please click my name at the top of the page and say 'I have a phone!' for a fast cash offer.";
var crackedBackStatement = "If your phone has a cracked back, prices vary depending in the severity of damage. Click my name and say 'I have a phone!' for a fast cash offer.";
var dontBuyStatement = "Unfortunately we aren't currently buying phones in this condition or model. Don't think this is correct? Click my name up top and say 'I have a phone!' for a fast cash offer!";

//all price calculations are done based on usedGoodPrice
//therefore EVERY PHONE MUST HAVE A USED GOOD PRICE
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
    usedGoodPrice: "70",
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
  {
    model: "iPhone 8",
    newPrice: "null",
    usedGoodPrice: "115",
    scratchFee: "15",
    crackedScreenFee: "35",
  },
  {
    model: "iPhone 8 Plus",
    newPrice: "null",
    usedGoodPrice: "135",
    scratchFee: "15",
    crackedScreenFee: "35",
  },
  {
    model: "iPhone X",
    newPrice: "null",
    usedGoodPrice: "135",
    scratchFee: "15",
    crackedScreenFee: "55",
  },
  {
    model: "iPhone XS",
    newPrice: "null",
    usedGoodPrice: "155",
    scratchFee: "15",
    crackedScreenFee: "70",
  },
  {
    model: "iPhone XS Max",
    newPrice: "null",
    usedGoodPrice: "200",
    scratchFee: "15",
    crackedScreenFee: "75",
  },
  {
    model: "iPhone XR",
    newPrice: "null",
    usedGoodPrice: "155",
    scratchFee: "15",
    crackedScreenFee: "70",
  },
  {
    model: "iPhone 11",
    newPrice: "null",
    usedGoodPrice: "210",
    scratchFee: "15",
    crackedScreenFee: "75",
  },
  {
    model: "iPhone 11 Pro",
    newPrice: "null",
    usedGoodPrice: "260",
    scratchFee: "20",
    crackedScreenFee: "65",
  },
  {
    model: "iPhone 11 Pro Max",
    newPrice: "null",
    usedGoodPrice: "385",
    scratchFee: "20",
    crackedScreenFee: "95",
  },
  {
    model: "iPhone SE 2nd Gen",
    newPrice: "null",
    usedGoodPrice: "110",
    scratchFee: "15",
    crackedScreenFee: "30",
  },
];

$(document).ready(function () {
  phonePriceData.forEach((phoneJSON, index) => {
    $("#model-selection").append(
      `<option value="${index}">${phoneJSON.model}</option>`
    );
  });
  $("#model-selection").append(`<option value="Other">Other</option>`);
});

var meetInLawrence = false;

function selectHandler(selection) {
  $(".form-check-input").removeAttr("disabled");
  if (selection == "Other") {
    $(".form-check-input").attr("disabled", true);
  } else if (selection != "") {
    if (phonePriceData[selection].newPrice == "null") {
      $("#new-check").attr("disabled", true);
    }
    if (phonePriceData[selection].scratchFee == "null") {
      $("#scratches").attr("disabled", true);
    }
    if (phonePriceData[selection].crackedScreenFee == "null") {
      $("#cracked-screen").attr("disabled", true);
    }
    if (phonePriceData[selection].usedGoodPrice == "null") {
      $("#used-good").attr("disabled", true);
    }
  }
}

//calculates price
function calculatePrice() {
  var selection = $("#model-selection").find(":selected").val();

  if (selection != "Other"){
    if ($("#new-check").is(":checked")) {
      return phonePriceData[selection].newPrice;
    } else {
      let price = phonePriceData[selection].usedGoodPrice;
      if ($("#scratches").is(":checked")) {
        price -= phonePriceData[selection].scratchFee;
      }
      if ($("#cracked-back").is(":checked")) {
        //cracked back disclaimer - also display price?
        return crackedBackStatement;
      }

      if ($("#cracked-screen").is(":checked")) {
        if ($("#icloud-locked").is(":checked")) {
          return dontBuyStatement;
        }
        price -= phonePriceData[selection].crackedScreenFee;
      }
      if (
        $("#icloud-locked").is(":checked") &&
        !$("#cracked-screen").is(":checked")
      ) {
        return phonePriceData[selection].crackedScreenFee / 2;
      }
      if ($("#black-screen").is(":checked")) {
        return "Contact/Explanation";
      }

      return price;
    }
    }else{
        return contactStatement;
    }
}

function displayPrice() {
  var finalPrice = calculatePrice();
  if((finalPrice == contactStatement)||(finalPrice == dontBuyStatement)||(finalPrice == crackedBackStatement)){
    $("#resultDisplay").text(finalPrice);
  }else{
    if (meetInLawrence) {
        finalPrice = parseInt(finalPrice) + 15;
      }
      $("#resultDisplay").text("Estimated Value: " + finalPrice);
  }
 
}

function canMeet() {
  meetInLawrence = true;
  $("#canMeetBtn").removeClass("btn-secondary");
  $("#canMeetBtn").addClass("btn-success");
  $("#cantMeetBtn").removeClass("btn-danger");
  $("#cantMeetBtn").addClass("btn-secondary");
  displayPrice();
}

function cantMeet() {
  meetInLawrence = false;
  $("#canMeetBtn").addClass("btn-secondary");
  $("#canMeetBtn").removeClass("btn-success");
  $("#cantMeetBtn").addClass("btn-danger");
  $("#cantMeetBtn").removeClass("btn-secondary");
  displayPrice();
}

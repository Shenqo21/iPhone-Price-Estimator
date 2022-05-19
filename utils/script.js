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
  phonePriceData.forEach((phoneJSON, index) => {
    $("#model-selection").append(
      `<option value="${index}">${phoneJSON.model}</option>`
    );
  });
});

var meetInLawrence = false;

//calculates price
function calculatePrice() {
  if ($("#new-check").is(':checked')) {
    return phonePriceData[$("#model-selection").find(":selected").val()]
      .newPrice;
  } else {
    let price =
      phonePriceData[$("#model-selection").find(":selected").val()]
        .usedGoodPrice;
    if ($("#scratches").is(':checked')) {
      price -=
        phonePriceData[$("#model-selection").find(":selected").val()]
          .scratchFee;
    }
    if ($("#cracked-back").is(':checked')) {
      //cracked back disclaimer - also display price?
      return "Back Crack Explanation";
    }

    if ($("#cracked-screen").is(':checked')) {
      if ($("#icloud-locked").is(':checked')) {
        return "Not Buying";
      }
      price -=
        phonePriceData[$("#model-selection").find(":selected").val()]
          .crackedScreenFee;
    }
    if ($("#icloud-locked").is(':checked') && !$("#cracked-screen").is(':checked')) {
      return (
        phonePriceData[$("#model-selection").find(":selected").val()]
          .crackedScreenFee / 2
      );
    }
    if ($("#black-screen").is(':checked')) {
      return "Contact/Explanation";
    }
    if(meetInLawrence)
    {
      price = parseInt(price) + 15;
    }
    return price;
  }
}

function displayPrice() {
  $('#resultDisplay').text('Estimated Value: '+calculatePrice());
  console.log(calculatePrice());
}



function canMeet() {
  meetInLawrence = true;
  $('#canMeetBtn').removeClass('btn-secondary');
  $('#canMeetBtn').addClass('btn-success');
  $('#cantMeetBtn').removeClass('btn-danger');
  $('#cantMeetBtn').addClass('btn-secondary');
  displayPrice();
}

function cantMeet() {
  meetInLawrence = false;
  $('#canMeetBtn').addClass('btn-secondary');
  $('#canMeetBtn').removeClass('btn-success');
  $('#cantMeetBtn').addClass('btn-danger');
  $('#cantMeetBtn').removeClass('btn-secondary');
  displayPrice();
}
require([
  "dijit/layout/TabContainer",
  "dijit/layout/ContentPane",
  "dojo/dom",
  "dojo/on",
  "dojo/request/xhr",
  "dojo/domReady!"
], function(TabContainer, ContentPane, dom, on, xhr) {

  window.loadTabs = function() {

    var div = dom.byId("tabContainer");
    div.innerHTML = "";

    var tabs = new TabContainer({ style: "width:100%; height:100%;" }, div);

    // PERSONAL INFO
    tabs.addChild(new ContentPane({
      title: "Personal Info",
      content: `
        <label>Full Name:</label><br><input type="text" name="fullName"><br><br>
        <label>Email:</label><br><input type="email" name="email"><br><br>
        <label>Mobile:</label><br><input type="text" name="mobile"><br><br>
      `
    }));

    // ADDRESS INFO
    tabs.addChild(new ContentPane({
      title: "Address Info",
      content: `
        <label>Street:</label><br><input type="text" name="street"><br><br>
        <label>City:</label><br><input type="text" name="city"><br><br>
        <label>State:</label><br><input type="text" name="state"><br><br>
        <label>Pincode:</label><br><input type="text" name="pincode"><br><br>
      `
    }));

    // DOCUMENTS + AJAX SUBMIT
    tabs.addChild(new ContentPane({
      title: "Documents",
      content: `
        <h3>Upload Documents (AJAX)</h3>
        <form id="docForm" enctype="multipart/form-data">
          <label>Address Proof:</label><br>
          <input type="file" name="addressProof" required><br><br>

          <label>ID Proof:</label><br>
          <input type="file" name="idProof" required><br><br>

          <button type="button" id="submitBtn">Submit Application</button>
        </form>
        <div id="ajaxResponse" style="margin-top:10px;color:green;"></div>
      `
    }));

    tabs.startup();

    // AJAX Submit
    on(dom.byId("submitBtn"), "click", function() {
      var form = dom.byId("docForm");

      // Gather all fields from all tabs
      var personal = div.querySelector("input[name='fullName']").value;
      var email = div.querySelector("input[name='email']").value;
      var mobile = div.querySelector("input[name='mobile']").value;
      var street = div.querySelector("input[name='street']").value;
      var city = div.querySelector("input[name='city']").value;
      var state = div.querySelector("input[name='state']").value;
      var pincode = div.querySelector("input[name='pincode']").value;

      var formData = new FormData();
      formData.append("fullName", personal);
      formData.append("email", email);
      formData.append("mobile", mobile);
      formData.append("street", street);
      formData.append("city", city);
      formData.append("state", state);
      formData.append("pincode", pincode);

      var addressFile = div.querySelector("input[name='addressProof']").files[0];
      var idFile = div.querySelector("input[name='idProof']").files[0];

      if(addressFile) formData.append("addressProof", addressFile);
      if(idFile) formData.append("idProof", idFile);

      xhr.post("ApplyCreditCard", {
        data: formData,
        handleAs: "text",
        headers: { "X-Requested-With": "XMLHttpRequest" },
        timeout: 10000
      }).then(function(response){
        dom.byId("ajaxResponse").innerHTML = response;
        form.reset();
      }, function(err){
        dom.byId("ajaxResponse").innerHTML = "Error: " + err;
      });
    });
  };
});

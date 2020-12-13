const commonlocators = require("../../../locators/commonlocators.json");
const dsl = require("../../../fixtures/tableTextPaginationDsl.json");
const pages = require("../../../locators/Pages.json");
const apiPage = require("../../../locators/ApiEditor.json");
const publishPage = require("../../../locators/publishWidgetspage.json");
const testdata = require("../../../fixtures/testdata.json");


describe("Test Create Api and Bind to Table widget", function() {
  before(() => {
    cy.addDsl(dsl);
  });

  it("Create an API and Execute the API and bind with Table", function() {
    cy.createAndFillApi(this.data.paginationUrl, this.data.paginationParam);
    cy.RunAPI();
  });

  it("Validate Table with API data and then add a column", function() {
    cy.SearchEntityandOpen("Table1");
    cy.testJsontext("tabledata", "{{Api1.data.users}}");
    cy.CheckWidgetProperties(commonlocators.serverSidePaginationCheckbox);
    cy.SearchEntityandOpen("Text1");
    cy.testJsontext("text", "{{Table1.selectedRow.url}}");
    cy.SearchEntityandOpen("Table1");
    cy.readTabledata("0", "0").then(tabData => {
      const tableData = tabData;
      localStorage.setItem("tableDataPage1", tableData);
    });
    cy.ValidateTableData("1");
    cy.addColumn("CustomColumn");

  });

  it("Update table json data and check the column names updated", function() {
    cy.SearchEntityandOpen("Table1");
    cy.testJsontext("tabledata", JSON.stringify(this.data.TableInputUpdate));
    cy.wait("@updateLayout");
    cy.tableColumnDataValidation("id");
    cy.tableColumnDataValidation("email");
    cy.tableColumnDataValidation("userName");
    cy.tableColumnDataValidation("productName");
    cy.tableColumnDataValidation("orderAmount");
    cy.tableColumnDataValidation("DERIVED1");
    cy.hideColumn("email");
    cy.hideColumn("userName");
    cy.hideColumn("productName");
    cy.hideColumn("orderAmount");
    cy.get(".draggable-header:contains('CustomColumn')").should("be.visible");
    cy.closePropertyPane();
  });
});
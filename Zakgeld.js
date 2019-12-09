/*
 * Kalena Zakgeld Calculator
 * Build for Elegast by Tim Van Onckelen
 * V 1.0.0
 * 
*/
if (typeof (ElegastKalena) == "undefined") { ElegastKalena = {}; }

// Define Elegast Zakgeld
ElegastKalena.Zakgeld = {
    formContext: null,
    tabObject: null,
    aantalDagRegistraties: null,

    Form_Onload: function (executionContext) {
        // Form Context
        ElegastKalena.Zakgeld.formContext = executionContext.getFormContext();
        // Tab object
        //ElegastKalena.Zakgeld.tabObject = ElegastKalena.Zakgeld.formContext.ui.tabs.get(arg);

        // Do a lookup for the amount of registration days
        this.doDayRegistrationLookup();
    },

    // Get the id of the current record
    getIdOfCurrentRecord: function () {
        return ElegastKalena.Zakgeld.formContext.data.entity.getId();
    },

    doDayRegistrationLookup: function () {

        // Get the current name of the entetie
        var currentId = this.getIdOfCurrentRecord();


        // Get maand id
        this.getAllMaanden();

        Xrm.WebApi.retrieveMultipleRecords("klnorg_dagregistratie", "?$select=_klnorg_jongere_value,_klnorg_maand_value&$filter=_klnorg_jongere_value eq " + currentId,50).then(
            function success(result) {
                // Count the amount of results
                var amountOfResults = result.entities.length;
                // Aantal records
                console.log("Aantal records:" + amountOfResults);
                // perform additional operations on retrieved records
            },
            function (error) {
                console.log(error.message);
                // handle error conditions
            }
        );

    }, 

    // Find all months
    getAllMaanden: function () {

        var d = new Date();
        var currentMonth = d.getMonth();

        let maandType = 648890005; // Id from a month in INSTELLINGEN Entiety

        // Get maand instelling from current month 
        // The year is also a specific record in the instellingen entitiey
        Xrm.WebApi.retrieveMultipleRecords("klnorg_instelling", "?$filter=klnorg_type eq " + maandType + " and klnorg_code eq '" + currentMonth.toString() + "", 10).then(
            function success(result) {
                console.log(result);
            },
            function (error) {

            });

    },

    getGivenYearId: function () {

        var d = new Date();
        var currentYear = d.getFullYear();
        let yearType = 648890005; // Id from a month in INSTELLINGEN Entiety

        // Get maand instelling from current month 
        // The year is also a specific record in the instellingen entitiey
        Xrm.WebApi.retrieveMultipleRecords("klnorg_instelling", "?$select=klnorg_instellingid&$filter=klnorg_type eq " + yearType + " and klnorg_code eq '" + currentMonth.toString() + "", 10).then(
            function success(result) {
                console.log(result);
            },
            function (error) {
                return false;
            });

    },
}
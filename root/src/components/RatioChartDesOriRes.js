import React from "react";
import ReactEcharts from "echarts-for-react"
import countryData from './result.json';

export default function RatioChartDesOriRes(props) {
    const {origin, destination} = props;
    const countries_to_iso = require('../hooks/countries_to_iso_a2.json');

    const getCountryName = (iso) => {
        return countries_to_iso.find((s) => s["code"] === iso)?.name
    }

    if(destination && origin){}
    // get origin country for resettlement data
    var oriCountryRes = countryData.filter((s) => s.geo === destination && s.citizen === origin && s.type === "RES" && s.age === "TOTAL" && s.sex === "T");
    console.log(oriCountryRes);
    var OR = oriCountryRes.reduce((a, v) => a = a + v.sum, 0)
    // get destination country for resettlement data
    var desCountryRes = countryData.filter((s) => s.geo === destination && s.type === "RES" && s.age === "TOTAL" && s.sex === "T");
    console.log(desCountryRes);
    var DR = desCountryRes.reduce((a, v) => a = a + v.sum, 0)
    var TR = DR - OR
    console.log("OR: " + OR)
    console.log("DR: " + DR)
    console.log("TR: " + TR)
    // var TR = DR - OR
 
    var options = require("../hooks/insightDesOriRes.json");
    options["series"][0]["data"][0]["value"] = Math.trunc((OR / DR) * 100)
    options["series"][0]["data"][0]["name"] = origin + "/ " + destination + " : " + Math.trunc((OR / DR) * 100) + "%"
    options["series"][0]["data"][1]["value"] = Math.trunc((TR / DR) * 100)
    options["series"][0]["data"][1]["name"] = "Other / " + destination + " : " + Math.trunc((TR / DR) * 100) + "%"
    options.title.text = Math.trunc((OR / DR) * 100) + "% of asylum resettlmemnts received from \n" + getCountryName(destination) + " are given to " + getCountryName(origin) + " citizens";

    return <div id="Top7TypeBar">
        <ReactEcharts
            option={options}
            // style={{ width: "400px", height: "240px", alignItems: "center", justifyContent: "center" }}
        ></ReactEcharts>  
    </div>
}
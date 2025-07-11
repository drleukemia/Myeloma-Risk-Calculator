import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/ui/tabs";
import Calculator from "./components/Calculator";
import RISSCalculator from "./components/RISSCalculator";
import SurvivalCharts from "./components/SurvivalCharts";
import ReferenceTable from "./components/ReferenceTable";
import CreatorCredits from "./components/CreatorCredits";
import { Calculator as CalculatorIcon, TrendingUp, FileText, Info, BarChart3 } from "lucide-react";

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-3 rounded-full">
              <CalculatorIcon className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
            IMWG Risk Calculator
          </h1>
          <p className="text-xl text-gray-600 mb-2">
            Multiple Myeloma High-Risk Assessment Tool
          </p>
          <p className="text-sm text-gray-500">
            Based on International Myeloma Working Group Consensus Recommendations
          </p>
        </div>

        {/* Navigation Tabs */}
        <Tabs defaultValue="calculator" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="calculator" className="flex items-center gap-2">
              <CalculatorIcon className="w-4 h-4" />
              IMWG Risk
            </TabsTrigger>
            <TabsTrigger value="riss" className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4" />
              R-ISS Staging
            </TabsTrigger>
            <TabsTrigger value="survival" className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              Survival Data
            </TabsTrigger>
            <TabsTrigger value="reference" className="flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Reference Tables
            </TabsTrigger>
          </TabsList>

          <TabsContent value="calculator" className="space-y-6">
            <Calculator />
          </TabsContent>

          <TabsContent value="survival" className="space-y-6">
            <SurvivalCharts />
          </TabsContent>

          <TabsContent value="reference" className="space-y-6">
            <ReferenceTable />
          </TabsContent>
        </Tabs>

        {/* Footer */}
        <div className="mt-16 text-center">
          <div className="bg-white rounded-lg shadow-sm p-6 max-w-4xl mx-auto">
            <div className="flex items-center justify-center mb-4">
              <Info className="w-5 h-5 text-blue-600 mr-2" />
              <span className="font-medium text-gray-900">Clinical Disclaimer</span>
            </div>
            <p className="text-sm text-gray-600 leading-relaxed">
              This calculator is intended for use by healthcare professionals and is based on published 
              research and consensus guidelines. It should not replace clinical judgment or be used as the 
              sole basis for treatment decisions. Always consult current clinical guidelines and consider 
              individual patient factors when making treatment decisions.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
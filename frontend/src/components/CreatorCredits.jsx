import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Heart, Users, Shield, AlertTriangle, ExternalLink, Linkedin, Github } from 'lucide-react';
import { Alert, AlertDescription } from './ui/alert';

const CreatorCredits = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6 mt-16">
      {/* Creator Information */}
      <Card className="bg-gradient-to-r from-blue-50 to-purple-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-center justify-center">
            <Heart className="w-5 h-5 text-red-500" />
            Created with ❤️ for the Medical Community
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <div className="space-y-2">
            <h3 className="text-xl font-semibold text-gray-900">Dr. Ankit Kansagra</h3>
            <p className="text-gray-600">Creator & Developer</p>
            <div className="flex justify-center gap-4 text-sm">
              <Badge variant="outline" className="bg-white">Physician</Badge>
              <Badge variant="outline" className="bg-white">Researcher</Badge>
              <Badge variant="outline" className="bg-white">Developer</Badge>
            </div>
          </div>
          
          <p className="text-sm text-gray-700 max-w-2xl mx-auto leading-relaxed">
            This IMWG Risk Calculator was developed to make cutting-edge multiple myeloma risk assessment 
            more accessible to healthcare professionals worldwide. Built with evidence-based medicine 
            principles and the latest International Myeloma Working Group guidelines.
          </p>
          
          <div className="flex justify-center gap-4 mt-4">
            <a 
              href="https://www.linkedin.com/in/drankitkansagra/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-blue-600 hover:text-blue-800 text-sm"
            >
              <Linkedin className="w-4 h-4" />
              LinkedIn Profile
            </a>
            <a 
              href="https://github.com/ankitkansagra" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-blue-600 hover:text-blue-800 text-sm"
            >
              <Github className="w-4 h-4" />
              GitHub
            </a>
          </div>
        </CardContent>
      </Card>

      {/* Purpose and Mission */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5 text-blue-600" />
            Free Educational Tool
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Our Mission:</h4>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Democratize access to advanced risk assessment tools</li>
                <li>• Bridge the gap between research and clinical practice</li>
                <li>• Support healthcare workers in low-resource settings</li>
                <li>• Promote evidence-based decision making</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Target Users:</h4>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Hematologists and oncologists</li>
                <li>• Medical residents and fellows</li>
                <li>• Healthcare professionals in training</li>
                <li>• Researchers and clinical investigators</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Important Disclaimers */}
      <div className="space-y-4">
        <Alert className="border-amber-200 bg-amber-50">
          <AlertTriangle className="h-4 w-4 text-amber-600" />
          <AlertDescription className="text-amber-800">
            <strong>Medical Disclaimer:</strong> This calculator is intended for educational purposes only and should not replace clinical judgment or be used as the sole basis for treatment decisions.
          </AlertDescription>
        </Alert>

        <Alert className="border-red-200 bg-red-50">
          <Shield className="h-4 w-4 text-red-600" />
          <AlertDescription className="text-red-800">
            <strong>Clinical Decision Support:</strong> Always consult current clinical guidelines, consider individual patient factors, and use your professional medical judgment when making treatment decisions. This tool does not constitute medical advice.
          </AlertDescription>
        </Alert>
      </div>

      {/* Legal and Usage Terms */}
      <Card className="border-gray-200">
        <CardHeader>
          <CardTitle className="text-gray-800 text-lg">Terms of Use & Acknowledgments</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-sm text-gray-700">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Usage Terms:</h4>
              <ul className="space-y-1">
                <li>• <strong>Free for educational use</strong> by healthcare professionals</li>
                <li>• <strong>No commercial use</strong> without explicit permission</li>
                <li>• <strong>Attribution required</strong> when referencing or sharing</li>
                <li>• <strong>No warranty</strong> - use at your own professional discretion</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Data & Privacy:</h4>
              <ul className="space-y-1">
                <li>• <strong>No patient data stored</strong> on our servers</li>
                <li>• <strong>Calculations performed locally</strong> when possible</li>
                <li>• <strong>HIPAA considerations</strong> - avoid entering PHI</li>
                <li>• <strong>Open source</strong> - transparent algorithms</li>
              </ul>
            </div>
          </div>
          
          <div className="pt-4 border-t">
            <h4 className="font-medium text-gray-900 mb-2">Acknowledgments:</h4>
            <p className="leading-relaxed">
              This calculator is based on the International Myeloma Working Group (IMWG) consensus recommendations 
              and multiple published studies. We acknowledge the contributions of researchers worldwide who have 
              advanced our understanding of multiple myeloma risk stratification. Special thanks to the 
              International Myeloma Society and all the clinical investigators whose work made this tool possible.
            </p>
          </div>
          
          <div className="pt-4 border-t">
            <h4 className="font-medium text-gray-900 mb-2">Citations & References:</h4>
            <div className="space-y-2 text-xs">
              <p>
                <strong>IMWG Risk Criteria:</strong> International Myeloma Society/International Myeloma Working Group 
                Consensus Recommendations on the Definition of High-Risk Multiple Myeloma (2024)
              </p>
              <p>
                <strong>R-ISS Staging:</strong> Palumbo A, et al. Revised International Staging System for Multiple Myeloma. 
                J Clin Oncol. 2015;33(26):2863-2869.
              </p>
              <p>
                <strong>Survival Data:</strong> Based on published cohort studies and clinical trial data from major 
                international myeloma groups including GEM, IFM, and other collaborative networks.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Contact and Support */}
      <Card className="bg-gray-50">
        <CardContent className="pt-6">
          <div className="text-center space-y-3">
            <h4 className="font-medium text-gray-900">Questions, Feedback, or Suggestions?</h4>
            <p className="text-sm text-gray-600">
              We welcome feedback from the medical community to improve this tool
            </p>
            <div className="flex justify-center gap-6 text-sm">
              <a 
                href="https://www.linkedin.com/in/drankitkansagra/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-blue-600 hover:text-blue-800"
              >
                <Linkedin className="w-4 h-4" />
                Send Message
              </a>
              <a 
                href="https://github.com/ankitkansagra/imwg-calculator" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-blue-600 hover:text-blue-800"
              >
                <ExternalLink className="w-4 h-4" />
                Report Issues
              </a>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Footer */}
      <div className="text-center text-xs text-gray-500 pt-6 border-t">
        <p>
          © 2024 Dr. Ankit Kansagra. Made with ❤️ for the global medical community. 
          This tool is provided free of charge for educational purposes.
        </p>
        <p className="mt-1">
          Version 1.0 • Last updated: December 2024 • 
          Built with React, FastAPI, and evidence-based medicine principles
        </p>
      </div>
    </div>
  );
};

export default CreatorCredits;
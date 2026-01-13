import React, { useState } from 'react';

interface ScenarioTesterProps {
  onScenarioChange?: (scenario: string, result: any) => void;
}

const ScenarioTester: React.FC<ScenarioTesterProps> = ({ onScenarioChange }) => {
  const [selectedScenario, setSelectedScenario] = useState('scenario-1');
  const [interestRateChange, setInterestRateChange] = useState(0.5);

  const scenarios = [
    { id: 'scenario-1', name: 'Interest Rate Change', description: 'Impact of interest rate changes' },
    { id: 'scenario-2', name: 'Tenure Extension', description: 'Effect of extending loan tenure' },
    { id: 'scenario-3', name: 'Payment Delinquency', description: 'Impact of payment delays' },
  ];

  const handleScenarioChange = (value: string) => {
    setSelectedScenario(value);
    onScenarioChange?.(value, { interest: interestRateChange });
  };

  return (
    <div className="space-y-4">
      <div className="bg-gray-50 rounded-lg p-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Test Scenarios</h3>
        
        <div className="space-y-3">
          {scenarios.map((scenario) => (
            <label key={scenario.id} className="flex items-start space-x-3 cursor-pointer p-3 rounded-lg hover:bg-white transition">
              <input
                type="radio"
                name="scenario"
                value={scenario.id}
                checked={selectedScenario === scenario.id}
                onChange={() => handleScenarioChange(scenario.id)}
                className="mt-1"
              />
              <div>
                <p className="font-medium text-gray-700">{scenario.name}</p>
                <p className="text-sm text-gray-500">{scenario.description}</p>
              </div>
            </label>
          ))}
        </div>

        {selectedScenario === 'scenario-1' && (
          <div className="mt-4 p-4 bg-white rounded-lg border border-gray-200">
            <label className="block text-sm font-medium text-gray-700 mb-2">Interest Rate Change (%)</label>
            <input
              type="range"
              min={-2}
              max={5}
              step={0.5}
              value={interestRateChange}
              onChange={(e) => {
                setInterestRateChange(parseFloat(e.target.value));
                onScenarioChange?.(selectedScenario, { interest: parseFloat(e.target.value) });
              }}
              className="w-full"
            />
            <p className="mt-2 text-sm text-gray-600">{interestRateChange > 0 ? '+' : ''}{interestRateChange}%</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ScenarioTester;

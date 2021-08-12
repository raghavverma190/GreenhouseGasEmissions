from script import GasEmissions

obj = GasEmissions(FILE_INPUT_CALL='greenhouse_gas_inventory_data_data.csv')

obj.cleanData()
obj.readDataFromCSV()
obj.mapVisualization()
obj.MinMaxValues()
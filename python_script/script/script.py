import json
import csv
from collections import defaultdict

import pandas
import pandas as pd
import numpy as np


class GasEmissions:

    def __init__(self,FILE_INPUT_CALL):
        """
        File input file name is initialised
        :param FILE_INPUT_CALL:
        """
        self.FILE_INPUT= FILE_INPUT_CALL

    def def_value(self):
        """
        Returns the default value as list of key not present in dictionary
        :return:List
        """
        return []


    def cleanData(self):
        """
        Checking for null values in dataset.
        As there are no null values; long category names are reduced to short names, and generated in a new cleaned CSV file
        :return:None
        """
        # Override default pandas configuration
        pd.options.display.width = 0
        pd.options.display.max_rows = 10000
        pd.options.display.max_info_columns = 10000

        # Opening dataset
        df = pd.read_csv(self.FILE_INPUT)

        # Rename columns
        df.rename(columns={'country_or_area': 'country'}, inplace=True)

        #Checking for nulls in dataset
        number_of_nulls = df.isnull().sum().sum()
        print(f"Null values in dataset: {number_of_nulls}")

        #Renaming categories
        category = df['category']
        df['category'] = np.where(
            category != "carbon_dioxide_co2_emissions_without_land_use_land_use_change_and_forestry_lulucf_in_kilotonne_co2_equivalent",
            category, 'CO2')
        df['category'] = np.where(
            category != "greenhouse_gas_ghgs_emissions_including_indirect_co2_without_lulucf_in_kilotonne_co2_equivalent",
            category, 'GHG_indirect_CO2')
        df['category'] = np.where(
            category != "greenhouse_gas_ghgs_emissions_without_land_use_land_use_change_and_forestry_lulucf_in_kilotonne_co2_equivalent",
            category, 'GHG')
        df['category'] = np.where(
            category != "hydrofluorocarbons_hfcs_emissions_in_kilotonne_co2_equivalent",
            category, 'HFC')
        df['category'] = np.where(
            category != "methane_ch4_emissions_without_land_use_land_use_change_and_forestry_lulucf_in_kilotonne_co2_equivalent",
            category, 'CH4')
        df['category'] = np.where(
            category != "nitrous_oxide_n2o_emissions_without_land_use_land_use_change_and_forestry_lulucf_in_kilotonne_co2_equivalent",
            category, 'N2Os')
        df['category'] = np.where(
            category != "perfluorocarbons_pfcs_emissions_in_kilotonne_co2_equivalent",
            category, 'PFCs')
        df['category'] = np.where(
            category != "sulphur_hexafluoride_sf6_emissions_in_kilotonne_co2_equivalent",
            category, 'SF6')
        df['category'] = np.where(
            category != "unspecified_mix_of_hydrofluorocarbons_hfcs_and_perfluorocarbons_pfcs_emissions_in_kilotonne_co2_equivalent",
            category, 'HFC_PFC_mix')
        df['category'] = np.where(
            category != "nitrogen_trifluoride_nf3_emissions_in_kilotonne_co2_equivalent",
            category, 'HF3')

        # writing into the file
        df.to_csv(f"cleaned_{self.FILE_INPUT}", index=False)

        print("Data has been cleaned")

    def readDataFromCSV(self):
        """
        Data is read from cleaned CSV file. Aim is to convert data in JSON format that can be read for generating graphs in frontend.
        Data is first separated in terms of category(parameters such as CO2,CH4,HFC etc). Then data for each parameter is separated based
        on year; achieving the required format mentioned below.

        Format of json data required:
        [{country:value,year:XXXX}....from 1990-2014]

        After format for a paramter is achieved, dictionary is iterated and sent to the function(writeJSONFile) that generates JSON data
        for that particular parameter

        :return: None
        """
        #Main dictionary maintained for all parameters
        data_dict = defaultdict(self.def_value)

        #Dictionary maintained to keep track of EACH year for EACH parameter
        year_dict = {}
        with open(f"cleaned_{self.FILE_INPUT}", mode="r") as csv_read:
            file_reader = csv.reader(csv_read, delimiter=",")

            for field in file_reader:
                if field[0] != "country":
                    if field[3] not in year_dict:
                        year_dict[field[3]] = {}
                    if field[1] not in year_dict[field[3]]:
                        year_dict[field[3]][field[1]] = {'year': int(field[1])}
                    year_dict[field[3]][field[1]][field[0]] = int(float(field[2]))

            for key, value in year_dict.items():
                for key2, value2 in year_dict[key].items():
                    data_dict[key].append(value2)

            for key, value in data_dict.items():
                self.writeJSONFile(data_list=value, FILE_OUTPUT=key)

    def writeJSONFile(self,data_list, FILE_OUTPUT):
        """
        Data for each parameter receieved from readDataFromCSV function is converted to JSON format
        All json data is stored in data directory inside the src folder of frontend

        :param data_list:
        :param FILE_OUTPUT:
        :return: None
        """
        #Writing into json file
        with open(f"json_data/{FILE_OUTPUT}", "wt") as json_write:
            for result in data_list:
                if result == data_list[0]:
                    json_write.write("[")

                json.dump(result, json_write, sort_keys=True, indent=4, ensure_ascii=False)

                if result == data_list[-1]:
                    json_write.write("]")

                if result != data_list[-1]:
                    json_write.write(",")
            print(f"JSON data for {FILE_OUTPUT} has been generated")

    def mapVisualization(self):
        """
        Cleaned CSV data file is read using pandas. Each row is iterated and added to a dictionary(based on parameter) to acheive format shown
        below. After dictionary is created(for each parameter), a new CSV file in MapVisualizationData folder is created and
        data is added from the dictionary. All MapVisualizationCSV files are added in the public directory inside frontend folder.

        Current Fromat:
        country	    year	value	        category
        Australia	2014	393126.947	      CO2

        AIM(separate file for each category with the following format):
        ISO3	Name	 1995	       1996	        1997	    1998	    1999	    2000	    2001
        AFG	Afghanistan	0.449547099	0.449547099	0.449547099	0.449324036	0.449100972	0.448877909	0.448654846

        :return: None
        """
        # Override default pandas configuration
        pd.options.display.width = 0
        pd.options.display.max_rows = 10000
        pd.options.display.max_info_columns = 10000

        #Reading cleaned csv file
        df = pd.read_csv(f'cleaned_{self.FILE_INPUT}')
        parameters = ['CH4', 'CO2', 'GHG', 'GHG_indirect_CO2', 'HF3', 'HFC', 'HFC_PFC_mix', 'N2Os', 'PFCs', 'SF6']

        #Iterating through all parameters and generating MapVisualization csv file for each parameter
        for parameter in parameters:
            dff = df[df['category'] == parameter]
            dff = dff.drop(columns=['category'])

            country_dict = {}
            rows = []
            for row in dff.itertuples():
                if row[1] not in country_dict:
                    country_dict[row[1]] = {}
                country_dict[row[1]][row[2]] = row[3]
            for key, value in country_dict.items():
                value['Name'] = key
                rows.append(value)

            dff = pd.DataFrame(rows)

            #Merging wikipedia country codes file with our dataframe to include ISO3 format country values that will be read
            #in frontend for map visualization
            cc = pd.read_csv('wikipedia-iso-country-codes.csv')
            cc = cc.rename(columns={"Alpha-3 code": "ISO3"})
            dff_merge = pd.merge(dff, cc, left_on='Name', right_on='English short name lower case', how='left')
            dff_merge = dff_merge.drop(
                columns=['English short name lower case', 'Alpha-2 code', 'Numeric code', 'ISO 3166-2'])

            dff_merge.to_csv(f'MapVisualizationData/{parameter}_MV.csv', index=False)
            print(f"{parameter} map visualization file created")

    def MinMaxValues(self):
        """
        Function required to know min-max values for each gas in the year of 2014. This data will be used in the front end
        for domain in map visualization
        :return: None
        """
        # Override default pandas configuration
        pd.options.display.width = 0
        pd.options.display.max_rows = 10000
        pd.options.display.max_info_columns = 10000

        parameters = ['CH4', 'CO2', 'GHG', 'GHG_indirect_CO2', 'HF3', 'HFC', 'HFC_PFC_mix', 'N2Os', 'PFCs', 'SF6']

        for parameter in parameters:
            df = pd.read_csv(f'MapVisualizationData/{parameter}_MV.csv')
            print(f"{parameter} : ")
            tup=(df['2014'].min(),df['2014'].max())
            print(tup)








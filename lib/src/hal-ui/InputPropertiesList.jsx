import React, { Component } from "react";
import styled from "styled-components";
import InputProperty from "./InputProperty.jsx";
import axios from "axios";

class InputPropertiesList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fetchedOptions: {},
    };
  }

  componentDidMount() {
    this.fetchAllOptions();
  }

  fetchAllOptions = async () => {
    const { properties } = this.props;
    try {
      const filteredProperties = properties.filter(property => property.options && property.options.link && property.options.link.href)
      const response = await Promise.all(filteredProperties.map((property) =>
        axios.get(property.options.link.href)
      ))
      const propertyObject = {}
      response.forEach((res, index) => {
        propertyObject[filteredProperties[index].key] = Object.values(res.data)[0]
      }
      )
      this.setState({ fetchedOptions: propertyObject })
    } catch (error) {
      console.error(`Error fetching data`);
    }
  };

  render() {
    const { properties, disabled, propertyUpdateFunction } = this.props;
    const { fetchedOptions } = this.state;
    return (
      <PropertiesListStyled>
        {properties.map((property) => {
          const enumOptions = property.options && fetchedOptions[property.key]? fetchedOptions[property.key] : null;
          return (
            <PropertyLayout key={property.key}>
              <PropertyWrapper>
                <Label>
                  {property.key}
                  <Text>{property.required === 'true' ? " * required" : ""}</Text>
                </Label>
                <div className="inline-labels">
                  <Label2 className="label-italic">{`${property.type}, `}</Label2>
                  <Label3>{property.format ? property.format : '-'}</Label3>
                </div>
                <Label1>{`min:${property.minLength ? property.minLength: '-' }, max:${property.maxLength ? property.maxLength : '-'}`}</Label1>
              </PropertyWrapper>
              <InputPropertyLayout>
                <Label>{property.description ? property.description : '-'}</Label>
                <InputProperty
                  disabled={disabled}
                  name={property.key}
                  type={property.type}
                  required={property.required}
                  propertyUpdateFunction={propertyUpdateFunction}
                  enumOptions={enumOptions}
                />
              </InputPropertyLayout>
            </PropertyLayout>
          );
        })}
      </PropertiesListStyled>
    );
  }
}

const PropertiesListStyled = styled.div`
  display: flex;
  flex-direction: column;
`;

const PropertyWrapper = styled.span`
  width: 50%;
  display: flex;
  flex-direction: column;
`;

const Text = styled.span`
  color: red;
  font-size: 13px;
`;

const PropertyLayout = styled.div`
  display: flex;
  margin: 5px 0px;
`;

const Label = styled.div`
  margin-bottom: 1px;
`;

const Label1 = styled.div`
  font-size: 12px;
  font-family: monospace;
`;

const Label2 = styled.span`
  font-size: 12px;
  font-style: italic;
  font-weight: 600;
`;

const Label3 = styled.span`
  font-size: 12px;
`;

const InputPropertyLayout = styled.div`
  width: 50%;
`;

export default InputPropertiesList;

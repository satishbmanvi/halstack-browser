import React from "react";
import styled from "styled-components";
import InputProperty from "./InputProperty.jsx";

const InputPropertiesList = ({ properties, disabled, propertyUpdateFunction }) => (
  <PropertiesListStyled>
    {properties.map((property) => (
      <PropertyLayout>
        <PropertyWrapper>
          <Label>
            {property.key}
            <Text>{property.required == 'true' ? " * required" : ""}</Text>
          </Label>
          <div className="inline-labels">
            <Label2 className="label-italic">{`${property.type}`}</Label2>,
            <Label3>{` ${property.format !== undefined && property.format !== null && property.format !== '' ? property.format : '-'}`}</Label3>
          </div>
          <Label1>{`min:${property.minLength} max:${property.maxLength}`}</Label1>
        </PropertyWrapper>
        <InputPropertyLayout>
          <Label>{property.description != undefined && property.description != '' && property.description != null ? property.description : '-'}</Label>
          <InputProperty
            disabled={disabled}
            name={property.key}
            type={property.type}
            // format={property.metadata.format}
            // enumOptions={property.metadata.enum}
            required={property.required}
            propertyUpdateFunction={propertyUpdateFunction}
          />
        </InputPropertyLayout>
      </PropertyLayout>
    ))}
  </PropertiesListStyled>
);

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

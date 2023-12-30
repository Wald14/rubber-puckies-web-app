import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';

export default function DropDown(props) {

  const label = props.label
  const options = props.options


  return (
      <Form.Group className="mb-3">
        <Form.Label>{label}</Form.Label>
        <Form.Select>
          { options &&
            options.map((option, key) => {
              return (
                <option key={key} value={option}>{option}</option>
              )
            })
          }
        </Form.Select>
      </Form.Group>
  );
}
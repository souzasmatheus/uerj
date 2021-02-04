import React, { useState } from 'react';
import {
  Col,
  Row,
  Jumbotron,
  ListGroup,
  ListGroupItem,
  Button,
} from 'react-bootstrap';

const requestImageFile = require.context(
  '../../../assets/images',
  false,
  /.png$/
);

const Question = ({ data, onNewQuestion }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [showCorrect, setShowCorrect] = useState(false);
  const { supportText, supportImage, title, options, correct } = data;

  const handleNewQuestion = () => {
    setSelectedOption(null);
    setShowCorrect(false);
    onNewQuestion();
  };

  return (
    <Row className="justify-content-center">
      <Col lg="8">
        <Jumbotron>
          {supportText && (
            <p dangerouslySetInnerHTML={{ __html: supportText }} />
          )}
          {supportImage && (
            <Row className="justify-content-center mb-4">
              <img
                style={{ maxWidth: '95%' }}
                src={requestImageFile(`./2012-1-1.png`).default}
              />
            </Row>
          )}
          <ListGroup>
            <ListGroupItem>{title}</ListGroupItem>
            {options.map((option, index) => (
              <ListGroupItem
                onClick={() => setSelectedOption(index)}
                key={`option-${index}`}
                active={index === selectedOption}
                style={
                  correct === index && showCorrect
                    ? { cursor: 'pointer', backgroundColor: 'green' }
                    : { cursor: 'pointer' }
                }
              >
                {option}
              </ListGroupItem>
            ))}
          </ListGroup>
          <Row className="mt-2">
            <Col className="justify-content-end d-flex">
              <Button
                variant="dark"
                className="mr-2"
                onClick={() => setShowCorrect(true)}
              >
                Corrigir
              </Button>
              <Button variant="light" onClick={handleNewQuestion}>
                Próxima
              </Button>
            </Col>
          </Row>
        </Jumbotron>
      </Col>
    </Row>
  );
};

export default Question;

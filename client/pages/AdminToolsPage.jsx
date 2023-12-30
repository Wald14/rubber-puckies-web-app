import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { CustomModal, SeasonForm, TeamForm } from '../components'
import { useState } from 'react';

export default function AdminTools() {
  const [shownModal, setShownModal] = useState(false);
  const handleClose = () => setShownModal(false);





  return (
    <>
      <h1>Admin Tools</h1>
      <p>This is the admin tools page.</p>

      <Row xs={1} md={2} lg={4} className="g-4">
        <Col>
          <Card>
            <Card.Body>
              <Card.Title>Game Controls</Card.Title>
            </Card.Body>
            <ListGroup className="list-group-flush">
              <ListGroup.Item>

                <Card.Link style={{ textDecoration: "none" }}>Update Game</Card.Link>

              </ListGroup.Item>
              <ListGroup.Item>
                <Card.Link href="#" style={{ textDecoration: "none" }}>Create Game</Card.Link>
              </ListGroup.Item>
              <ListGroup.Item>
                <Card.Link href="#" style={{ textDecoration: "none" }}>Delete Game</Card.Link>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>

        <Col>
          <Card>
            <Card.Body>
              <Card.Title>Player Controls</Card.Title>
            </Card.Body>
            <ListGroup className="list-group-flush">
              <ListGroup.Item>
                <Card.Link href="#" style={{ textDecoration: "none" }}>Update Player</Card.Link>
              </ListGroup.Item>
              <ListGroup.Item>
                <Card.Link href="#" style={{ textDecoration: "none" }}>Create Player</Card.Link>
              </ListGroup.Item>
              <ListGroup.Item>
                <Card.Link href="#" style={{ textDecoration: "none" }}>Delete Player</Card.Link>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>

        <Col>
          <Card>
            <Card.Body>
              <Card.Title>Team Controls</Card.Title>
            </Card.Body>
            <ListGroup className="list-group-flush">
            <ListGroup.Item>
                <Card.Link onClick={() => setShownModal("updateTeam")} style={{ textDecoration: "none", cursor: "pointer" }}>Update Team</Card.Link>
                <CustomModal
                  title="Update Team"
                  open={shownModal === "updateTeam"}
                  close={handleClose}
                  enterFunction={() => console.log("Updating Team")}
                  closeBtnTitle="Cancel"
                  enterBtnTitle="Update Team"
                >
                  <TeamForm
                    adminController="updateTeam"
                    handleClose={handleClose}
                  />
                </CustomModal>
              </ListGroup.Item>

              <ListGroup.Item>
                <Card.Link onClick={() => {setShownModal("createTeam")}} style={{ textDecoration: "none", cursor: "pointer" }}>Create Team</Card.Link>
                <CustomModal
                  open={shownModal === "createTeam"}
                  title="Create Team"
                  close={handleClose}
                  enterFunction={() => console.log("Creating Team")}
                  closeBtnTitle="Cancel"
                  enterBtnTitle="Create Team"
                >
                  <TeamForm
                    adminController="createTeam"
                    handleClose={handleClose}
                  />
                </CustomModal>
              </ListGroup.Item>

              <ListGroup.Item>
                <Card.Link onClick={() => setShownModal("deleteTeam")} style={{ textDecoration: "none", cursor: "pointer" }}>Delete Team</Card.Link>
                <CustomModal
                  title="Delete Team"
                  open={shownModal === "deleteTeam"}
                  close={handleClose}
                  enterFunction={() => console.log("Deleting Team")}
                  closeBtnTitle="Cancel"
                  enterBtnTitle="Delete Team"
                >
                  <TeamForm
                    adminController="deleteTeam"
                    handleClose={handleClose}
                  />
                </CustomModal>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>

        <Col>
          <Card>
            <Card.Body>
              <Card.Title>Season Controls</Card.Title>
            </Card.Body>

            <ListGroup className="list-group-flush">

              <ListGroup.Item>
                <Card.Link onClick={() => setShownModal("updateSeason")} style={{ textDecoration: "none", cursor: "pointer" }}>Update Season</Card.Link>
                <CustomModal
                  title="Update Season"
                  open={shownModal === "updateSeason"}
                  close={handleClose}
                  enterFunction={() => console.log("Updating Season")}
                  closeBtnTitle="Cancel"
                  enterBtnTitle="Update Season"
                >
                  <SeasonForm
                    adminController="updateSeason"
                    handleClose={handleClose}
                  />
                </CustomModal>
              </ListGroup.Item>

              <ListGroup.Item>
                <Card.Link onClick={() => {setShownModal("createSeason")}} style={{ textDecoration: "none", cursor: "pointer" }}>Create Season</Card.Link>
                <CustomModal
                  open={shownModal === "createSeason"}
                  title="Create Season"
                  close={handleClose}
                  enterFunction={() => console.log("Creating Season")}
                  closeBtnTitle="Cancel"
                  enterBtnTitle="Create Season"
                >
                  <SeasonForm
                    adminController="createSeason"
                    handleClose={handleClose}
                  />
                </CustomModal>
              </ListGroup.Item>

              <ListGroup.Item>
                <Card.Link onClick={() => setShownModal("deleteSeason")} style={{ textDecoration: "none", cursor: "pointer" }}>Delete Season</Card.Link>
                <CustomModal
                  title="Delete Season"
                  open={shownModal === "deleteSeason"}
                  close={handleClose}
                  enterFunction={() => console.log("Deleting Season")}
                  closeBtnTitle="Cancel"
                  enterBtnTitle="Delete Season"
                >
                  <SeasonForm
                    adminController="deleteSeason"
                    handleClose={handleClose}
                  />
                </CustomModal>
              </ListGroup.Item>

            </ListGroup>
          </Card>
        </Col>

      </Row>
    </>
  )
}
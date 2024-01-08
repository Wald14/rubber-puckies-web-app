import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { CustomModal, SeasonForm, TeamForm, PlayerForm, GameForm, GameFormNew } from '../components'
import { useState } from 'react';

export default function AdminTools() {
  const [shownModal, setShownModal] = useState(false);
  const handleClose = () => setShownModal(false);





  return (
    <>
      <h1>Admin Tools</h1>

      {/* ------------------------------------------------------------------------
            GAME CONTROLS
      ------------------------------------------------------------------------ */}
      <Row xs={1} md={2} lg={4} className="g-4">
        <Col>
          <Card>
            <Card.Body>
              <Card.Title>Game Controls</Card.Title>
            </Card.Body>
            <ListGroup className="list-group-flush">
            <ListGroup.Item>
                <Card.Link onClick={() => setShownModal("updateGame")} style={{ textDecoration: "none", cursor: "pointer" }}>Update Game</Card.Link>
                <CustomModal
                  title="Update Game"
                  open={shownModal === "updateGame"}
                  close={handleClose}
                  enterFunction={() => console.log("Updating Game")}
                  closeBtnTitle="Cancel"
                  enterBtnTitle="Update Game"
                >
                  <GameForm
                    adminController="updateGame"
                    handleClose={handleClose}
                  />
                </CustomModal>
              </ListGroup.Item>

              <ListGroup.Item>
                <Card.Link onClick={() => { setShownModal("createGame") }} style={{ textDecoration: "none", cursor: "pointer" }}>Create Game</Card.Link>
                <CustomModal
                  open={shownModal === "createGame"}
                  title="Create Game"
                  close={handleClose}
                  enterFunction={() => console.log("Creating Game")}
                  closeBtnTitle="Cancel"
                  enterBtnTitle="Create Game"
                >
                  <GameForm
                    adminController="createGame"
                    handleClose={handleClose}
                  />
                </CustomModal>
              </ListGroup.Item>

              <ListGroup.Item>
                <Card.Link onClick={() => setShownModal("deleteGame")} style={{ textDecoration: "none", cursor: "pointer" }}>Delete Game</Card.Link>
                <CustomModal
                  title="Delete Game"
                  open={shownModal === "deleteGame"}
                  close={handleClose}
                  enterFunction={() => console.log("Deleting Game")}
                  closeBtnTitle="Cancel"
                  enterBtnTitle="Delete Game"
                >
                  <GameForm
                    adminController="deleteGame"
                    handleClose={handleClose}
                  />
                </CustomModal>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>

      {/* ------------------------------------------------------------------------
            GAME CONTROLS
      ------------------------------------------------------------------------ */}
        <Col>
          <Card>
            <Card.Body>
              <Card.Title>Game Controls New</Card.Title>
            </Card.Body>
            <ListGroup className="list-group-flush">
            <ListGroup.Item>
                <Card.Link onClick={() => setShownModal("updateGameNew")} style={{ textDecoration: "none", cursor: "pointer" }}>Update Game</Card.Link>
                <CustomModal
                  title="Update Game"
                  open={shownModal === "updateGameNew"}
                  close={handleClose}
                  enterFunction={() => console.log("Updating Game")}
                  closeBtnTitle="Cancel"
                  enterBtnTitle="Update Game"
                >
                  <GameFormNew
                    adminController="updateGameNew"
                    handleClose={handleClose}
                  />
                </CustomModal>
              </ListGroup.Item>

              <ListGroup.Item>
                <Card.Link onClick={() => { setShownModal("createGameNew") }} style={{ textDecoration: "none", cursor: "pointer" }}>Create Game</Card.Link>
                <CustomModal
                  open={shownModal === "createGameNew"}
                  title="Create Game"
                  close={handleClose}
                  enterFunction={() => console.log("Creating Game")}
                  closeBtnTitle="Cancel"
                  enterBtnTitle="Create Game"
                >
                  <GameFormNew
                    adminController="createGameNew"
                    handleClose={handleClose}
                  />
                </CustomModal>
              </ListGroup.Item>

              <ListGroup.Item>
                <Card.Link onClick={() => setShownModal("deleteGameNew")} style={{ textDecoration: "none", cursor: "pointer" }}>Delete Game</Card.Link>
                <CustomModal
                  title="Delete Game"
                  open={shownModal === "deleteGameNew"}
                  close={handleClose}
                  enterFunction={() => console.log("Deleting Game")}
                  closeBtnTitle="Cancel"
                  enterBtnTitle="Delete Game"
                >
                  <GameFormNew
                    adminController="deleteGameNew"
                    handleClose={handleClose}
                  />
                </CustomModal>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>

        {/* ------------------------------------------------------------------------
              PLAYER CONTROLS
        ------------------------------------------------------------------------ */}
        <Col>
          <Card>
            <Card.Body>
              <Card.Title>Player Controls</Card.Title>
            </Card.Body>
            <ListGroup className="list-group-flush">
            <ListGroup.Item>
                <Card.Link onClick={() => setShownModal("updatePlayer")} style={{ textDecoration: "none", cursor: "pointer" }}>Update Player</Card.Link>
                <CustomModal
                  title="Update Player"
                  open={shownModal === "updatePlayer"}
                  close={handleClose}
                  enterFunction={() => console.log("Updating Player")}
                  closeBtnTitle="Cancel"
                  enterBtnTitle="Update Player"
                >
                  <PlayerForm
                    adminController="updatePlayer"
                    handleClose={handleClose}
                  />
                </CustomModal>
              </ListGroup.Item>

              <ListGroup.Item>
                <Card.Link onClick={() => { setShownModal("createPlayer") }} style={{ textDecoration: "none", cursor: "pointer" }}>Create Player</Card.Link>
                <CustomModal
                  open={shownModal === "createPlayer"}
                  title="Create Player"
                  close={handleClose}
                  enterFunction={() => console.log("Creating Player")}
                  closeBtnTitle="Cancel"
                  enterBtnTitle="Create Player"
                >
                  <PlayerForm
                    adminController="createPlayer"
                    handleClose={handleClose}
                  />
                </CustomModal>
              </ListGroup.Item>

              <ListGroup.Item>
                <Card.Link onClick={() => setShownModal("deletePlayer")} style={{ textDecoration: "none", cursor: "pointer" }}>Delete Player</Card.Link>
                <CustomModal
                  title="Delete Player"
                  open={shownModal === "deletePlayer"}
                  close={handleClose}
                  enterFunction={() => console.log("Deleting Player")}
                  closeBtnTitle="Cancel"
                  enterBtnTitle="Delete Player"
                >
                  <PlayerForm
                    adminController="deletePlayer"
                    handleClose={handleClose}
                  />
                </CustomModal>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>


        {/* ------------------------------------------------------------------------
              TEAM CONTROLS
        ------------------------------------------------------------------------ */}
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
                <Card.Link onClick={() => { setShownModal("createTeam") }} style={{ textDecoration: "none", cursor: "pointer" }}>Create Team</Card.Link>
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


        {/* ------------------------------------------------------------------------
              SEASON CONTROLS
        ------------------------------------------------------------------------ */}
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
                <Card.Link onClick={() => { setShownModal("createSeason") }} style={{ textDecoration: "none", cursor: "pointer" }}>Create Season</Card.Link>
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
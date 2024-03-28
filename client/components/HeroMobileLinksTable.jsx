import Table from "react-bootstrap/esm/Table";

export default function HeroMobileLinksTable() {

  return (
    <Table
      borderless
      style={{
        textAlign: "center",
        fontSize: "16px"
      }}
    >
      <tbody>
        <tr>
          <td>
            <a
              href='/roster'
              style={{ color: "goldenrod" }}
            >
              Current Roster
            </a>
          </td>
          <td>
            <a
              href='/teamhistory'
              style={{ color: "goldenrod" }}
            >
              Team History
            </a>
          </td>
        </tr>
        <tr>
          <td>
            <a
              href='/roster'
              style={{ color: "goldenrod" }}
            >
              All Players
            </a>
          </td>
          <td>
            <a
              href='/teamhistory'
              style={{ color: "goldenrod" }}
            >
              Season & Game Logs
            </a>
          </td>
        </tr>
      </tbody>
    </Table>

  )
}
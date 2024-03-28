
// React Icons
import { FaGithub } from "react-icons/fa";

export default function Footer() {

  return (
    <footer
      className="bg-body-tertiary"
      style={{
        marginTop: "32px",
        padding: "8px 0px 8px 0px",
        minHeight: "80px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
        <a
          href="https://github.com/Wald14/rubber-puckies-web-app"
          target="_blank"
        >
          <FaGithub
            style={{
              color: "goldenrod",
              width: "24px",
              height: "24px",
              margin: "16px"
            }}
          />
        </a>
        <p
          style={{ 
            textAlign: 'center',
            margin: "16px"
          }}
        >
          Copyright &copy; {new Date().getFullYear()} All Rights Reserved
        </p>

    </footer>
  );
}
import Accordion from "react-bootstrap/Accordion";
import "../../css/Home1.css";
import backgroundImage from "../../css/1.png";
import backgroundImage2 from "../../css/4.webp";

function Home() {
  return (
    <>
      <Accordion defaultActiveKey="0">
        <Accordion.Item eventKey="0">
          <Accordion.Header>
            <h2 className="head">WHO WE ARE</h2>
          </Accordion.Header>
          <Accordion.Body className="about">
            we are a digital platform that allows users to search for and book
            bus tickets in various locations.
            <br />
            Our platform helps users find the best deals on bus tickets, compare
            prices from different bus operators, and make secure online payments
            for their bookings.
            <br />
            We aim to simplify the process of booking bus tickets and provide a
            hassle-free experience for our users.
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="1">
          <Accordion.Header>
            <h2 className="head">WE ARE DIFFERENT THAN THE REST</h2>
          </Accordion.Header>
          <Accordion.Body className="about">
            This a Bus Booking App where you can book for a safe and comfortable
            travel experience.
            <br />
            Don't Worry We Will Take care Of You WE are a highly secured System
            that will take care of you and all you have.
            <br />
            if any thing lost come to us We will be at your serviceAll Your
            Luggage Is Kept Safe
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>

      <div className="photo-container">
        <img src={backgroundImage} alt="Photo 1" className="photo1" />
        <img src={backgroundImage2} alt="Photo 2" className="photo2"/>
      </div>
    </>
  );
}

export default Home;
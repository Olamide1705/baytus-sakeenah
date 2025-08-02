// import VolunteerHeader from '../components/VolunteerHeader';

const Volunteer = () => {
  return (
    <section id="volunteer">
      <iframe
        src="https://docs.google.com/forms/d/e/1FAIpQLScURnntqcXNYs1MsH3wPqFJFK1nR2KALsVsL5VzBCH_goCOWw/viewform?embedded=true"
        width="100%"
        height={800}
        style={{ border: "none", maxWidth: "600px,", overflow: "hidden" }}
        scrolling="no"
        allowFullScreen
        title="Volunteer Form"
      ></iframe>
    </section>
  );
};

export default Volunteer;

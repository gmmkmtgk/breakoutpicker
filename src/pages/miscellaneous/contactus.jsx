import MainCard from 'components/MainCard';
import { ContactUsLayout } from 'components/extended/ContactUs';

const ContactUs = () => {
  return (
    <MainCard
      title="Contact Us"
      secondary={
        <Typography variant="h6">
          Feel free to reach out to us if you have any questions or concerns.
        </Typography>
      }
    >
      <ContactUsLayout />
    </MainCard>
  );
};

export default ContactUs;

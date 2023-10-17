import { Card, CardActionArea, Typography } from '@mui/material';
import { GETClient } from '../../../../pages/api/clients';
import PrimaryDarkText from '../../../common/display-modifiers/primary-dark-text';
import ConfirmModal from '../../../common/inputs/confirm-modal';

type Props = {
  client: GETClient;
  selectedClient: number | null;
  onSelect: () => void;
  onClose: () => void;
  onConfirmSelection: () => void;
};

const SimilarClientCard: React.FC<Props> = ({
  client,
  selectedClient,
  onSelect,
  onClose,
  onConfirmSelection,
}) => {
  return (
    <>
      <Card key={client.id} variant="outlined">
        <CardActionArea sx={{ p: 1 }} onClick={onSelect}>
          <Typography variant="body1">
            <PrimaryDarkText>{client.name}</PrimaryDarkText>
          </Typography>
          <Typography variant="subtitle2">
            {client.Email.length > 0 ? client.Email[0].email : 'Няма имейл'} (+
            {client.Email.length - 1} други)
          </Typography>
          <Typography variant="subtitle2">
            {client.Phone[0].phone} (+{client.Phone.length - 1} други)
          </Typography>
        </CardActionArea>
      </Card>
      <ConfirmModal
        show={selectedClient === client.id}
        label={`Сигурни ли сте, че искате да свържете това съобщение с текущият клиент (${client.name} / ${client.Phone[0].phone})`}
        onClose={onClose}
        onConfirm={onConfirmSelection}
      />
    </>
  );
};

export default SimilarClientCard;

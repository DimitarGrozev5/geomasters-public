import { Box, Chip, ClickAwayListener, lighten } from '@mui/material';

import EmailIcon from '@mui/icons-material/Email';

import { Email } from '@prisma/client';

import EditableData from '../../../../common/inputs/editable-fields/editable-data';
import { isEmail } from '../../../../../utility/validation/isEmail';
import { Selected } from '../profile-contacts';

type Props = {
  email: Email;
  partnerId: number;
  emailsLen: number;
  selected: Selected;
  setSelected: (s: Selected) => void;
};

const ProfileEmailCard: React.FC<Props> = ({
  email,
  selected,
  setSelected,
  partnerId,
  emailsLen,
}) => {
  const handleClick = (type: 'email' | 'phone', id: number) => () => {
    setSelected({ type, id });
  };

  return (
    <>
      {selected.type === 'email' && selected.id === email.id && (
        <ClickAwayListener onClickAway={() => setSelected({ type: '', id: 0 })}>
          <Box
            sx={{
              position: 'absolute',
              left: 0,
              right: 0,
              top: 0,
              bottom: 0,
              zIndex: (theme) => theme.zIndex.modal - 1,

              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Box
              sx={{
                position: 'absolute',
                left: 0,
                right: 0,
                top: 0,
                bottom: 0,
                zIndex: (theme) => theme.zIndex.modal - 1,

                backgroundColor: '#00000044',
                backdropFilter: 'blur(2px)',
              }}
              onClick={() => setSelected({ type: '', id: 0 })}
            />
            <Box
              sx={{
                backgroundColor: (theme) =>
                  lighten(theme.palette.primary.A50!, 0.6),
                p: 1,
                borderRadius: (theme) => theme.spacing(1),
                zIndex: (theme) => theme.zIndex.modal - 1,
              }}
            >
              <EditableData
                data={email.email}
                url={`/api/emails/${email.id}/email`}
                invalidates={['partner', partnerId]}
                successMessage="Успешно променен Имейл"
                validation={{
                  validate: (val) =>
                    isEmail(val) || 'Моля въведете валиден имейл',
                }}
                withDelete={
                  emailsLen > 1
                    ? {
                        url: `/api/emails/${email.id}`,
                        invalidates: ['partner', partnerId],
                        successMessage: 'Имейлът е изтрит',
                      }
                    : undefined
                }
                inViewMode={false}
                setInViewMode={() => setSelected({ type: '', id: 0 })}
              />
            </Box>
          </Box>
        </ClickAwayListener>
      )}

      <Chip
        onClick={handleClick('email', email.id)}
        variant="outlined"
        sx={{
          pl: 0.5,
          pr: 1.5,
          borderColor: (theme) => theme.palette.primary.A900,
          backgroundColor: (theme) => theme.palette.primary.A50,
        }}
        icon={
          <EmailIcon
            sx={{
              fontSize: (theme) => theme.spacing(2.5),
              '&&': { color: (theme) => theme.palette.primary.A900 },
            }}
          />
        }
        label={<Box sx={{ pl: 0.75 }}>{email.email}</Box>}
      />
    </>
  );
};

export default ProfileEmailCard;

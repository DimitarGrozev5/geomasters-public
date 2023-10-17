import { Box, Chip, ClickAwayListener, lighten } from '@mui/material';

import LocalPhoneIcon from '@mui/icons-material/PhoneEnabled';
import viberImg from '../../../../../public/images/icons/viber.png';

import Image from 'next/image';

import { Phone } from '@prisma/client';

import EditableData from '../../../../common/inputs/editable-fields/editable-data';
import { Selected } from '../profile-contacts';
import EditableSwitch from '../../../../common/inputs/editable-fields/editable-switch';
import ViberSwitch from '../../../../common/inputs/viber-swtch';

type Props = {
  phone: Phone;
  partnerId: number;
  phonesLen: number;
  selected: Selected;
  setSelected: (s: Selected) => void;
};

const ProfilePhoneCard: React.FC<Props> = ({
  phone,
  selected,
  setSelected,
  partnerId,
  phonesLen,
}) => {
  const handleClick = (type: 'email' | 'phone', id: number) => () => {
    setSelected({ type, id });
  };

  return (
    <>
      {selected.type === 'phone' && selected.id === phone.id && (
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
                  lighten(theme.palette.secondary.A50!, 0.6),
                p: 1,
                borderRadius: (theme) => theme.spacing(1),
                zIndex: (theme) => theme.zIndex.modal - 1,
              }}
            >
              <EditableData
                data={phone.phone}
                url={`/api/phones/${phone.id}/phone`}
                invalidates={['partner', partnerId]}
                successMessage="Успешно променен Телефон"
                withDelete={
                  phonesLen > 1
                    ? {
                        url: `/api/phones/${phone.id}`,
                        invalidates: ['partner', partnerId],
                        successMessage: 'Телефонът е изтрит',
                      }
                    : undefined
                }
                inViewMode={false}
                setInViewMode={() => setSelected({ type: '', id: 0 })}
              />
              <EditableSwitch
                label={`${phone.hasViber ? 'Има' : 'Няма'} Viber`}
                checked={phone.hasViber}
                url={`/api/phones/${phone.id}/hasViber`}
                invalidates={['partner', partnerId]}
                switchComponent={<ViberSwitch />}
              />
            </Box>
          </Box>
        </ClickAwayListener>
      )}

      <Chip
        onClick={handleClick('phone', phone.id)}
        variant="outlined"
        sx={{
          pl: 0.5,
          pr: 1.5,
          borderColor: (theme) => theme.palette.secondary.A900,
          backgroundColor: (theme) => theme.palette.secondary.A50,
        }}
        key={phone.id}
        icon={
          <LocalPhoneIcon
            sx={{
              fontSize: (theme) => theme.spacing(2.5),
              '&&': { color: (theme) => theme.palette.secondary.A900 },
            }}
          />
        }
        label={
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              pl: 0.75,
            }}
          >
            {phone.phone}
            {
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  position: 'relative',
                }}
              >
                <Image
                  src={viberImg}
                  alt={phone.hasViber ? 'Има Viber' : 'Няма Viber'}
                  style={{
                    height: '1.1rem',
                    width: 'auto',
                    filter: !phone.hasViber ? 'grayscale(100%)' : undefined,
                  }}
                />
                {!phone.hasViber && (
                  <Box
                    sx={{
                      position: 'absolute',
                      left: -4,
                      width: '140%',
                      borderTop: '1px solid black',
                      transform: 'rotate(-45deg)',
                    }}
                  />
                )}
              </Box>
            }
          </Box>
        }
      />
    </>
  );
};

export default ProfilePhoneCard;

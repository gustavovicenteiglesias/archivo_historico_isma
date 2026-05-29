import { Card, CardActionArea, CardContent, CardMedia, Chip, Stack, Typography } from '@mui/material';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import CategoryIcon from '@mui/icons-material/Category';
import { useNavigate } from 'react-router-dom';

export default function FotoCard({ foto }) {
  const navigate = useNavigate();

  return (
    <Card sx={{ height: '100%' }}>
      <CardActionArea onClick={() => navigate(`/galeria/${foto.id}`)} sx={{ height: '100%' }}>
        <CardMedia
          component="img"
          image={foto.urlThumbnail || foto.urlImagen}
          alt={foto.titulo}
          sx={{ aspectRatio: '4 / 3', objectFit: 'cover' }}
        />
        <CardContent>
          <Typography variant="h3" sx={{ mb: 1, fontSize: '1.05rem' }}>
            {foto.titulo}
          </Typography>
          <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap">
            {foto.anioAproximado && (
              <Chip icon={<CalendarMonthIcon />} label={foto.anioAproximado} size="small" />
            )}
            {foto.categoria && (
              <Chip icon={<CategoryIcon />} label={foto.categoria} size="small" color="primary" variant="outlined" />
            )}
          </Stack>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

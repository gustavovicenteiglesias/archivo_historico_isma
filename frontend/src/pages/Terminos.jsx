import { Alert, Button, Link, Paper, Stack, Typography } from '@mui/material';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import { CONTACT_EMAIL } from '../config/appConfig';

export default function Terminos() {
  return (
    <Paper sx={{ p: { xs: 2.5, md: 4 }, maxWidth: 860, mx: 'auto' }}>
      <Stack spacing={2.25}>
        <Typography variant="h1">Términos y autorización de publicación</Typography>
        <Alert severity="info">
          Esta página resume las condiciones para enviar fotografías al Archivo Histórico Digital ISMA.
        </Alert>

        <Typography variant="h2">Finalidad</Typography>
        <Typography color="text.secondary">
          El archivo tiene fines históricos, educativos e institucionales. Su objetivo es reunir, preservar y compartir imágenes vinculadas a la historia del Instituto Santa María de la Asunción y su comunidad educativa.
        </Typography>

        <Typography variant="h2">Envío de imágenes</Typography>
        <Typography color="text.secondary">
          Al enviar una fotografía, la persona colaboradora declara que cuenta con autorización suficiente para compartirla o que posee los derechos necesarios sobre la imagen. La publicación no es automática: cada aporte queda pendiente de revisión por administración.
        </Typography>

        <Typography variant="h2">Uso y revisión</Typography>
        <Typography color="text.secondary">
          ISMA podrá revisar la imagen y sus datos asociados, aprobarla, rechazarla, corregir metadatos, cambiar su categoría o retirarla del sitio si corresponde. Las imágenes publicadas se usarán sin fines comerciales, dentro del marco histórico, educativo e institucional del archivo.
        </Typography>

        <Typography variant="h2">Datos personales</Typography>
        <Typography color="text.secondary">
          El sistema registra internamente datos básicos del colaborador para trazabilidad, como nombre, email y proveedor de autenticación. El email del colaborador no se muestra públicamente en la galería.
        </Typography>

        <Typography variant="h2">Imagenes de personas y menores</Typography>
        <Typography color="text.secondary">
          Si la fotografía permite identificar personas, especialmente niños, niñas o adolescentes, se solicita enviarla solo cuando su publicación resulte adecuada para el archivo histórico y no afecte la privacidad, dignidad o intimidad de quienes aparecen.
        </Typography>

        <Typography variant="h2">Correcciones o baja</Typography>
        <Typography color="text.secondary">
          Cualquier persona que considere que una imagen debe corregirse, contextualizarse o retirarse puede comunicarse con la institución. El pedido será revisado por administración.
        </Typography>

        <Button
          href={`mailto:${CONTACT_EMAIL}?subject=Archivo Histórico ISMA - Solicitud de revisión`}
          startIcon={<MailOutlineIcon />}
          variant="contained"
          sx={{ alignSelf: 'flex-start' }}
        >
          Escribir a {CONTACT_EMAIL}
        </Button>

        <Typography variant="body2" color="text.secondary">
          Este texto es una guía institucional inicial y no reemplaza asesoramiento legal específico.
        </Typography>
      </Stack>
    </Paper>
  );
}

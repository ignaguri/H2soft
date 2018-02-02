export default {
  // Lista de servicios para notificacioens
  exito (context) {
    context.$notifications.notify(
      {
        message: 'Bravo! <br /> Operación exitosa',
        icon: 'ti-thumb-up',
        horizontalAlign: 'right',
        verticalAlign: 'top',
        type: 'success'
      })
  },
  //
  // En los mensajes no parametrizables de error o exito, se muestra un titulo, y en una linea mas abajo otro texto.
  // En el mensaje de éxito parametrizable, se puede enviar un texto para el titulo y otro texto para mostrar en un renglon mas abajo con mayor detalle
  //
  exitoConTexto (context, titulo, mensaje) {
    context.$notifications.notify(
      {
        message: titulo + '<br />' + mensaje,
        icon: 'ti-thumb-up',
        horizontalAlign: 'right',
        verticalAlign: 'top',
        type: 'success'
      })
  },
  error (context) {
    context.$notifications.notify(
      {
        message: 'Ouch! <br /> Algo salió mal',
        icon: 'ti-thumb-down',
        horizontalAlign: 'right',
        verticalAlign: 'top',
        type: 'danger'
      })
  },
  //
  // En los mensajes no parametrizables de error o exito, se muestra un titulo, y en una linea mas abajo otro texto.
  // En el mensaje de error parametrizable, se puede enviar un texto para el título y otro texto para mostrar en un renglon mas abajo con mayor detalle
  //
  errorConTexto (context, titulo, mensaje) {
    context.$notifications.notify(
      {
        message: titulo + '<br />' + mensaje,
        icon: 'ti-thumb-down',
        horizontalAlign: 'right',
        verticalAlign: 'top',
        type: 'danger'
      })
  },
  info (context, titulo, mensaje) {
    context.$notifications.notify(
      {
        message: titulo + '<br />' + mensaje,
        icon: 'ti-info-alt',
        horizontalAlign: 'right',
        verticalAlign: 'top',
        type: 'info'
      })
  }
  // TODO: servicios de notificaciones para avisos de mantenimientos!
}

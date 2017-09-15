export default {
  // Lista de servicios para notificacioens
  success (context) {
    context.$notifications.notify(
      {
        message: 'Bravo! \n Operación exitosa',
        icon: 'ti-thumb-up',
        horizontalAlign: 'right',
        verticalAlign: 'top',
        type: 'success'
      })
  },
  danger (context) {
    context.$notifications.notify(
      {
        message: 'Algo salió mal',
        icon: 'ti-thumb-down',
        horizontalAlign: 'right',
        verticalAlign: 'top',
        type: 'danger'
      })
  }
  // TODO: servicios de notificaciones para avisos de mantenimientos!
}

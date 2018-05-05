create EVENT `crear-alertas-automaticas` 
ON SCHEDULE EVERY 1 DAY STARTS '2018-05-02 00:01:00'
ON COMPLETION NOT PRESERVE ENABLE 
DO

insert into alertas
(idObjetivo,
idTipo,
idEstado,
notificacion,
idDispenser,
createdAt,
updatedAt)
select 
o. idObjetivosXCliente, 
1,
1,
concat('Se debe cambiar el dispenser ' , d.idDispensers , ' en el objetivo ' ,  o.nombre), 
d.idDispensers,
DATE_FORMAT(NOW(),'%y-%m-%d') as createdAt,
DATE_FORMAT(NOW(),'%y-%m-%d') as updatedAt
from dispensers d 
inner join `objetivos-x-cliente` o
 on o.idObjetivosXCliente = d.idObjetivo
where 
DATE_FORMAT(d.fechaProxMantenimiento,'%y-%m-%d') =  DATE_FORMAT(NOW(),'%y-%m-%d');

SET SQL_SAFE_UPDATES = 0;
update dispensers set idEstadoDispenser = 3 /*en objetivo y sucio*/
where idDispensers in (select idDispenser from alertas where DATE_FORMAT(createdAt,'%y-%m-%d') =  DATE_FORMAT(NOW(),'%y-%m-%d'));
SET SQL_SAFE_UPDATES = 1;



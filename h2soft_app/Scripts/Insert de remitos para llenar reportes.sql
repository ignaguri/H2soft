USE h2softapp;
SET @objetivo = (SELECT idObjetivosXcliente FROM `objetivos-x-cliente` ORDER BY idObjetivosXcliente ASC LIMIT 1);

INSERT INTO remitos (idObjetivo, fecha, idEmpleado, idEstadoRemito, firmaConforme, firma, createdAt, updatedAt) VALUES (@objetivo, '2018-01-10', 1, 1, 1, 'REMITO INSERTADO PARA REPORTES', '1970-01-01 00:00:00', '1970-01-01 00:00:00');
INSERT INTO `detalle-remito-productos` (idRemito, idProducto, cantidad, dejadoEnCliente, createdAt, updatedAt) VALUES (LAST_INSERT_ID(), 1, 230, 1, '1970-01-01 00:00:00', '1970-01-01 00:00:00');

-- -----------------------


INSERT INTO remitos (idObjetivo, fecha, idEmpleado, idEstadoRemito, firmaConforme, firma, createdAt, updatedAt) VALUES (@objetivo, '2018-02-10', 1, 1, 1, 'REMITO INSERTADO PARA REPORTES', '1970-01-01 00:00:00', '1970-01-01 00:00:00');
INSERT INTO `detalle-remito-productos` (idRemito, idProducto, cantidad, dejadoEnCliente, createdAt, updatedAt) VALUES (LAST_INSERT_ID(), 1, 220, 1, '1970-01-01 00:00:00', '1970-01-01 00:00:00');

-- -----------------------


INSERT INTO remitos (idObjetivo, fecha, idEmpleado, idEstadoRemito, firmaConforme, firma, createdAt, updatedAt) VALUES (@objetivo, '2018-03-10', 1, 1, 1, 'REMITO INSERTADO PARA REPORTES', '1970-01-01 00:00:00', '1970-01-01 00:00:00');
INSERT INTO `detalle-remito-productos` (idRemito, idProducto, cantidad, dejadoEnCliente, createdAt, updatedAt) VALUES (LAST_INSERT_ID(), 1, 200, 1, '1970-01-01 00:00:00', '1970-01-01 00:00:00');

-- -----------------------


INSERT INTO remitos (idObjetivo, fecha, idEmpleado, idEstadoRemito, firmaConforme, firma, createdAt, updatedAt) VALUES (@objetivo, '2018-04-10', 1, 1, 1, 'REMITO INSERTADO PARA REPORTES', '1970-01-01 00:00:00', '1970-01-01 00:00:00');
INSERT INTO `detalle-remito-productos` (idRemito, idProducto, cantidad, dejadoEnCliente, createdAt, updatedAt) VALUES (LAST_INSERT_ID(), 1, 180, 1, '1970-01-01 00:00:00', '1970-01-01 00:00:00');

-- -----------------------


INSERT INTO remitos (idObjetivo, fecha, idEmpleado, idEstadoRemito, firmaConforme, firma, createdAt, updatedAt) VALUES (@objetivo, '2018-05-10', 1, 1, 1, 'REMITO INSERTADO PARA REPORTES', '1970-01-01 00:00:00', '1970-01-01 00:00:00');
INSERT INTO `detalle-remito-productos` (idRemito, idProducto, cantidad, dejadoEnCliente, createdAt, updatedAt) VALUES (LAST_INSERT_ID(), 1, 160, 1, '1970-01-01 00:00:00', '1970-01-01 00:00:00');


-- -----------------------


INSERT INTO remitos (idObjetivo, fecha, idEmpleado, idEstadoRemito, firmaConforme, firma, createdAt, updatedAt) VALUES (@objetivo, '2018-06-10', 1, 1, 1, 'REMITO INSERTADO PARA REPORTES', '1970-01-01 00:00:00', '1970-01-01 00:00:00');
INSERT INTO `detalle-remito-productos` (idRemito, idProducto, cantidad, dejadoEnCliente, createdAt, updatedAt) VALUES (LAST_INSERT_ID(), 1, 140, 1, '1970-01-01 00:00:00', '1970-01-01 00:00:00');

-- -----------------------


INSERT INTO remitos (idObjetivo, fecha, idEmpleado, idEstadoRemito, firmaConforme, firma, createdAt, updatedAt) VALUES (4, '2018-07-10', 1, 1, 1, 'REMITO INSERTADO PARA REPORTES', '1970-01-01 00:00:00', '1970-01-01 00:00:00');
INSERT INTO `detalle-remito-productos` (idRemito, idProducto, cantidad, dejadoEnCliente, createdAt, updatedAt) VALUES (LAST_INSERT_ID(), 1, 40, 1, '1970-01-01 00:00:00', '1970-01-01 00:00:00');

INSERT INTO remitos (idObjetivo, fecha, idEmpleado, idEstadoRemito, firmaConforme, firma, createdAt, updatedAt) VALUES (5, '2018-07-10', 1, 1, 1, 'REMITO INSERTADO PARA REPORTES', '1970-01-01 00:00:00', '1970-01-01 00:00:00');
INSERT INTO `detalle-remito-productos` (idRemito, idProducto, cantidad, dejadoEnCliente, createdAt, updatedAt) VALUES (LAST_INSERT_ID(), 1, 42, 1, '1970-01-01 00:00:00', '1970-01-01 00:00:00');

INSERT INTO remitos (idObjetivo, fecha, idEmpleado, idEstadoRemito, firmaConforme, firma, createdAt, updatedAt) VALUES (7, '2018-07-10', 1, 1, 1, 'REMITO INSERTADO PARA REPORTES', '1970-01-01 00:00:00', '1970-01-01 00:00:00');
INSERT INTO `detalle-remito-productos` (idRemito, idProducto, cantidad, dejadoEnCliente, createdAt, updatedAt) VALUES (LAST_INSERT_ID(), 1, 44, 1, '1970-01-01 00:00:00', '1970-01-01 00:00:00');


-- -----------------------


INSERT INTO remitos (idObjetivo, fecha, idEmpleado, idEstadoRemito, firmaConforme, firma, createdAt, updatedAt) VALUES (@objetivo, '2018-08-10', 1, 1, 1, 'REMITO INSERTADO PARA REPORTES', '1970-01-01 00:00:00', '1970-01-01 00:00:00');
INSERT INTO `detalle-remito-productos` (idRemito, idProducto, cantidad, dejadoEnCliente, createdAt, updatedAt) VALUES (LAST_INSERT_ID(), 1, 130, 1, '1970-01-01 00:00:00', '1970-01-01 00:00:00');

-- -------------------


INSERT INTO remitos (idObjetivo, fecha, idEmpleado, idEstadoRemito, firmaConforme, firma, createdAt, updatedAt) VALUES (@objetivo, '2018-09-10', 1, 1, 1, 'REMITO INSERTADO PARA REPORTES', '1970-01-01 00:00:00', '1970-01-01 00:00:00');
INSERT INTO `detalle-remito-productos` (idRemito, idProducto, cantidad, dejadoEnCliente, createdAt, updatedAt) VALUES (LAST_INSERT_ID(), 1, 160, 1, '1970-01-01 00:00:00', '1970-01-01 00:00:00');

-- -----------------


INSERT INTO remitos (idObjetivo, fecha, idEmpleado, idEstadoRemito, firmaConforme, firma, createdAt, updatedAt) VALUES (@objetivo, '2018-10-10', 1, 1, 1, 'REMITO INSERTADO PARA REPORTES', '1970-01-01 00:00:00', '1970-01-01 00:00:00');
INSERT INTO `detalle-remito-productos` (idRemito, idProducto, cantidad, dejadoEnCliente, createdAt, updatedAt) VALUES (LAST_INSERT_ID(), 1, 180, 1, '1970-01-01 00:00:00', '1970-01-01 00:00:00');

-- ------------------


INSERT INTO remitos (idObjetivo, fecha, idEmpleado, idEstadoRemito, firmaConforme, firma, createdAt, updatedAt) VALUES (@objetivo, '2018-11-10', 1, 1, 1, 'REMITO INSERTADO PARA REPORTES', '1970-01-01 00:00:00', '1970-01-01 00:00:00');
INSERT INTO `detalle-remito-productos` (idRemito, idProducto, cantidad, dejadoEnCliente, createdAt, updatedAt) VALUES (LAST_INSERT_ID(), 1, 195, 1, '1970-01-01 00:00:00', '1970-01-01 00:00:00');

-- -----------------


INSERT INTO remitos (idObjetivo, fecha, idEmpleado, idEstadoRemito, firmaConforme, firma, createdAt, updatedAt) VALUES (@objetivo, '2018-12-10', 1, 1, 1, 'REMITO INSERTADO PARA REPORTES', '1970-01-01 00:00:00', '1970-01-01 00:00:00');
INSERT INTO `detalle-remito-productos` (idRemito, idProducto, cantidad, dejadoEnCliente, createdAt, updatedAt) VALUES (LAST_INSERT_ID(), 1, 215, 1, '1970-01-01 00:00:00', '1970-01-01 00:00:00');



-----------------------------------------------------------------------------------------------------------------------
-----------------------------------------------------------------------------------------------------------------------



INSERT INTO remitos (idObjetivo, fecha, idEmpleado, idEstadoRemito, firmaConforme, firma, createdAt, updatedAt) VALUES (@objetivo, '2018-01-10', 1, 1, 1, 'REMITO INSERTADO PARA REPORTES', '1970-01-01 00:00:00', '1970-01-01 00:00:00');
INSERT INTO `detalle-remito-productos` (idRemito, idProducto, cantidad, dejadoEnCliente, createdAt, updatedAt) VALUES (LAST_INSERT_ID(), 2, 120, 1, '1970-01-01 00:00:00', '1970-01-01 00:00:00');


-- -----------------------


INSERT INTO remitos (idObjetivo, fecha, idEmpleado, idEstadoRemito, firmaConforme, firma, createdAt, updatedAt) VALUES (@objetivo, '2018-02-10', 1, 1, 1, 'REMITO INSERTADO PARA REPORTES', '1970-01-01 00:00:00', '1970-01-01 00:00:00');
INSERT INTO `detalle-remito-productos` (idRemito, idProducto, cantidad, dejadoEnCliente, createdAt, updatedAt) VALUES (LAST_INSERT_ID(), 2, 110, 1, '1970-01-01 00:00:00', '1970-01-01 00:00:00');

-- -----------------------


INSERT INTO remitos (idObjetivo, fecha, idEmpleado, idEstadoRemito, firmaConforme, firma, createdAt, updatedAt) VALUES (@objetivo, '2018-03-10', 1, 1, 1, 'REMITO INSERTADO PARA REPORTES', '1970-01-01 00:00:00', '1970-01-01 00:00:00');
INSERT INTO `detalle-remito-productos` (idRemito, idProducto, cantidad, dejadoEnCliente, createdAt, updatedAt) VALUES (LAST_INSERT_ID(), 2, 100, 1, '1970-01-01 00:00:00', '1970-01-01 00:00:00');

-- -----------------------


INSERT INTO remitos (idObjetivo, fecha, idEmpleado, idEstadoRemito, firmaConforme, firma, createdAt, updatedAt) VALUES (@objetivo, '2018-04-10', 1, 1, 1, 'REMITO INSERTADO PARA REPORTES', '1970-01-01 00:00:00', '1970-01-01 00:00:00');
INSERT INTO `detalle-remito-productos` (idRemito, idProducto, cantidad, dejadoEnCliente, createdAt, updatedAt) VALUES (LAST_INSERT_ID(), 2, 70, 1, '1970-01-01 00:00:00', '1970-01-01 00:00:00');


-- -----------------------


INSERT INTO remitos (idObjetivo, fecha, idEmpleado, idEstadoRemito, firmaConforme, firma, createdAt, updatedAt) VALUES (@objetivo, '2018-05-10', 1, 1, 1, 'REMITO INSERTADO PARA REPORTES', '1970-01-01 00:00:00', '1970-01-01 00:00:00');
INSERT INTO `detalle-remito-productos` (idRemito, idProducto, cantidad, dejadoEnCliente, createdAt, updatedAt) VALUES (LAST_INSERT_ID(), 2, 60, 1, '1970-01-01 00:00:00', '1970-01-01 00:00:00');
-- -----------------------


INSERT INTO remitos (idObjetivo, fecha, idEmpleado, idEstadoRemito, firmaConforme, firma, createdAt, updatedAt) VALUES (@objetivo, '2018-06-10', 1, 1, 1, 'REMITO INSERTADO PARA REPORTES', '1970-01-01 00:00:00', '1970-01-01 00:00:00');
INSERT INTO `detalle-remito-productos` (idRemito, idProducto, cantidad, dejadoEnCliente, createdAt, updatedAt) VALUES (LAST_INSERT_ID(), 2, 50, 1, '1970-01-01 00:00:00', '1970-01-01 00:00:00');

-- -----------------------


INSERT INTO remitos (idObjetivo, fecha, idEmpleado, idEstadoRemito, firmaConforme, firma, createdAt, updatedAt) VALUES (@objetivo, '2018-07-10', 1, 1, 1, 'REMITO INSERTADO PARA REPORTES', '1970-01-01 00:00:00', '1970-01-01 00:00:00');
INSERT INTO `detalle-remito-productos` (idRemito, idProducto, cantidad, dejadoEnCliente, createdAt, updatedAt) VALUES (LAST_INSERT_ID(), 2, 50, 1, '1970-01-01 00:00:00', '1970-01-01 00:00:00');

-- -----------------------


INSERT INTO remitos (idObjetivo, fecha, idEmpleado, idEstadoRemito, firmaConforme, firma, createdAt, updatedAt) VALUES (@objetivo, '2018-08-10', 1, 1, 1, 'REMITO INSERTADO PARA REPORTES', '1970-01-01 00:00:00', '1970-01-01 00:00:00');
INSERT INTO `detalle-remito-productos` (idRemito, idProducto, cantidad, dejadoEnCliente, createdAt, updatedAt) VALUES (LAST_INSERT_ID(), 2, 40, 1, '1970-01-01 00:00:00', '1970-01-01 00:00:00');

-- -------------------


INSERT INTO remitos (idObjetivo, fecha, idEmpleado, idEstadoRemito, firmaConforme, firma, createdAt, updatedAt) VALUES (@objetivo, '2018-09-10', 1, 1, 1, 'REMITO INSERTADO PARA REPORTES', '1970-01-01 00:00:00', '1970-01-01 00:00:00');
INSERT INTO `detalle-remito-productos` (idRemito, idProducto, cantidad, dejadoEnCliente, createdAt, updatedAt) VALUES (LAST_INSERT_ID(), 2, 60, 1, '1970-01-01 00:00:00', '1970-01-01 00:00:00');

-- -----------------


INSERT INTO remitos (idObjetivo, fecha, idEmpleado, idEstadoRemito, firmaConforme, firma, createdAt, updatedAt) VALUES (@objetivo, '2018-10-10', 1, 1, 1, 'REMITO INSERTADO PARA REPORTES', '1970-01-01 00:00:00', '1970-01-01 00:00:00');
INSERT INTO `detalle-remito-productos` (idRemito, idProducto, cantidad, dejadoEnCliente, createdAt, updatedAt) VALUES (LAST_INSERT_ID(), 2, 80, 1, '1970-01-01 00:00:00', '1970-01-01 00:00:00');

-- ------------------


INSERT INTO remitos (idObjetivo, fecha, idEmpleado, idEstadoRemito, firmaConforme, firma, createdAt, updatedAt) VALUES (@objetivo, '2018-11-10', 1, 1, 1, 'REMITO INSERTADO PARA REPORTES', '1970-01-01 00:00:00', '1970-01-01 00:00:00');
INSERT INTO `detalle-remito-productos` (idRemito, idProducto, cantidad, dejadoEnCliente, createdAt, updatedAt) VALUES (LAST_INSERT_ID(), 2, 90, 1, '1970-01-01 00:00:00', '1970-01-01 00:00:00');

-- -----------------


INSERT INTO remitos (idObjetivo, fecha, idEmpleado, idEstadoRemito, firmaConforme, firma, createdAt, updatedAt) VALUES (@objetivo, '2018-12-10', 1, 1, 1, 'REMITO INSERTADO PARA REPORTES', '1970-01-01 00:00:00', '1970-01-01 00:00:00');
INSERT INTO `detalle-remito-productos` (idRemito, idProducto, cantidad, dejadoEnCliente, createdAt, updatedAt) VALUES (LAST_INSERT_ID(), 2, 110, 1, '1970-01-01 00:00:00', '1970-01-01 00:00:00');



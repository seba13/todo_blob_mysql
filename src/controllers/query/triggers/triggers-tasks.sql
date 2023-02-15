


/* setea un contador dependiendo de las tareas activas para tener un orden por defecto*/
delimiter $
CREATE TRIGGER default_order_task before INSERT ON tasks 
	for EACH row 
		begin 
        SET new.order_task = (select count(*) + 1 from tasks where deleted=0);
end $
    
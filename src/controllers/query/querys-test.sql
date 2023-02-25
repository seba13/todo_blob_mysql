
use db_authentication;

show triggers from db_authentication;

drop trigger default_order_task;


select * from tasks;


delimiter $$
CREATE TRIGGER default_order_task before INSERT ON tasks 
	for EACH row 
		begin 
        SET new.order_task = (select count(*) + 1 from tasks where deleted=0);
end $$


ALTER TABLE tasks ENGINE = AUDIT;

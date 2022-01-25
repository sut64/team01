BEGIN TRANSACTION;
CREATE TABLE IF NOT EXISTS "doctors" (
	"id"	integer,
	"created_at"	datetime,
	"updated_at"	datetime,
	"deleted_at"	datetime,
	"doctor_id"	text,
	"password"	text,
	"doctor_name"	text,
	"pid"	text,
	PRIMARY KEY("id")
);
CREATE TABLE IF NOT EXISTS "equipment" (
	"id"	integer,
	"created_at"	datetime,
	"updated_at"	datetime,
	"deleted_at"	datetime,
	"equipment_id"	text,
	"equipment_name"	text,
	"equipment_type"	text,
	"equipment_cost"	real,
	PRIMARY KEY("id")
);
CREATE TABLE IF NOT EXISTS "admissions" (
	"id"	integer,
	"created_at"	datetime,
	"updated_at"	datetime,
	"deleted_at"	datetime,
	"patient_id"	text,
	"patient_name"	text,
	"room_id"	text,
	"right_treatment"	text,
	"admit_time"	datetime,
	PRIMARY KEY("id")
);
CREATE TABLE IF NOT EXISTS "medicines" (
	"id"	integer,
	"created_at"	datetime,
	"updated_at"	datetime,
	"deleted_at"	datetime,
	"name"	text,
	"type"	text,
	"price"	integer,
	PRIMARY KEY("id")
);
CREATE TABLE IF NOT EXISTS "treatment_records" (
	"id"	integer,
	"created_at"	datetime,
	"updated_at"	datetime,
	"deleted_at"	datetime,
	"doctor_id"	integer,
	"record_date"	datetime,
	"treatment"	text,
	"food_type"	text,
	"med_amount"	integer,
	"cost"	integer,
	"equipment_id"	integer,
	"med_id"	integer,
	"admission_id"	integer,
	PRIMARY KEY("id"),
	CONSTRAINT "fk_medicines_treatment_records" FOREIGN KEY("med_id") REFERENCES "medicines"("id"),
	CONSTRAINT "fk_admissions_treatment_records" FOREIGN KEY("admission_id") REFERENCES "admissions"("id"),
	CONSTRAINT "fk_doctors_treatment_records" FOREIGN KEY("doctor_id") REFERENCES "doctors"("id"),
	CONSTRAINT "fk_equipment_treatment_records" FOREIGN KEY("equipment_id") REFERENCES "equipment"("id")
);
CREATE UNIQUE INDEX IF NOT EXISTS "idx_doctors_pid" ON "doctors" (
	"pid"
);
CREATE INDEX IF NOT EXISTS "idx_doctors_deleted_at" ON "doctors" (
	"deleted_at"
);
CREATE INDEX IF NOT EXISTS "idx_equipment_deleted_at" ON "equipment" (
	"deleted_at"
);
CREATE INDEX IF NOT EXISTS "idx_admissions_deleted_at" ON "admissions" (
	"deleted_at"
);
CREATE INDEX IF NOT EXISTS "idx_medicines_deleted_at" ON "medicines" (
	"deleted_at"
);
CREATE INDEX IF NOT EXISTS "idx_treatment_records_deleted_at" ON "treatment_records" (
	"deleted_at"
);
COMMIT;

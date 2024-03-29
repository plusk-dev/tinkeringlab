from sqlalchemy import Column, Integer, String, Boolean, DateTime, ForeignKey, create_engine
from sqlalchemy.orm import relationship, sessionmaker, declarative_base

Base = declarative_base()


class Admin(Base):
    __tablename__ = "Admin"
    id = Column(Integer, primary_key=True)
    name = Column(String, nullable=False)
    email = Column(String, nullable=False, unique=True)
    phone = Column(String, nullable=False, unique=True)
    admin = Column(Boolean, nullable=False)
    lab_tech = Column(Boolean, nullable=False, default=False)
    tl_head = Column(Boolean, nullable=False, default=False)


class Component(Base):
    __tablename__ = "Component"
    id = Column(Integer, primary_key=True)
    name = Column(String, nullable=False)
    total = Column(Integer, nullable=False)
    booked = Column(Integer, nullable=True, default=0)


class Machine(Base):
    __tablename__ = "Machine"
    id = Column(Integer, primary_key=True)
    name = Column(String, nullable=False)
    status = Column(Boolean, nullable=False, default=False)


class User(Base):
    __tablename__ = "User"
    id = Column(Integer, primary_key=True)
    student_id = Column(String, nullable=False, unique=True)
    email = Column(String, nullable=False, unique=True)
    name = Column(String, nullable=False)
    created_at = Column(DateTime, nullable=False)


class ComponentBooking(Base):
    __tablename__ = "ComponentBooking"
    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey("User.id"), nullable=False)
    component_id = Column(Integer, ForeignKey("Component.id"), nullable=False)
    description = Column(String, nullable=False)
    created_at = Column(DateTime, nullable=False)
    returndate = Column(DateTime, nullable=False)
    approved = Column(Boolean, nullable=False)
    approver_id = Column(Integer, ForeignKey("Admin.id"))

    user = relationship("User", backref="component_bookings")
    component = relationship("Component", backref="component_bookings")
    approver = relationship("Admin", backref="approved_component_bookings")


class MachineBooking(Base):
    __tablename__ = "MachineBooking"
    id = Column(Integer, primary_key=True)
    description = Column(String, nullable=False)
    machine_id = Column(Integer, ForeignKey("Machine.id"), nullable=False)
    user_id = Column(Integer, ForeignKey("User.id"), nullable=False)
    created_at = Column(DateTime, nullable=False)
    start = Column(DateTime, nullable=False)
    end = Column(DateTime, nullable=False)
    approved = Column(Boolean, nullable=False)
    approver_id = Column(Integer, ForeignKey("Admin.id"))

    machine = relationship("Machine", backref="machine_bookings")
    user = relationship("User", backref="machine_bookings")
    approver = relationship("Admin", backref="approved_machine_bookings")


class Workstation(Base):
    __tablename__ = "Workstation"
    id = Column(Integer, primary_key=True)
    name = Column(String, nullable=False)
    booked = Column(Boolean, nullable=False, default=False)


class WorkstationBooking(Base):
    __tablename__ = "WorkstationBooking"
    id = Column(Integer, primary_key=True)
    description = Column(String, nullable=False)
    workstation_id = Column(Integer, ForeignKey(
        "Workstation.id"), nullable=False)
    user_id = Column(Integer, ForeignKey("User.id"), nullable=False)
    created_at = Column(DateTime, nullable=False)
    start = Column(DateTime, nullable=False)
    end = Column(DateTime, nullable=False)
    approved = Column(Boolean, nullable=False)
    approver_id = Column(Integer, ForeignKey("Admin.id"))

    workstation = relationship("Workstation", backref="workstation_bookings")
    user = relationship("User", backref="workstation_bookings")
    approver = relationship("Admin", backref="approved_workstation_bookings")


class Event(Base):
    __tablename__ = "Event"
    id = Column(Integer, primary_key=True)
    title = Column(String, nullable=False)
    description = Column(String, nullable=True)
    created_at = Column(DateTime, nullable=False)
    event_date = Column(DateTime, nullable=False)
    img_name = Column(String, nullable=True)
    on_landing_page = Column(Boolean, nullable=False)


engine = create_engine("sqlite:///database.db", echo=False)
Base.metadata.create_all(bind=engine)

Session = sessionmaker()
session = Session(bind=engine)

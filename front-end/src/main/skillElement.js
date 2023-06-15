import React,{useState} from 'react';
import { Handle } from 'react-flow-renderer';
import {Button}from 'antd'
import { useStore } from '../store';
import SkillCard from './skillCard';
import './main.css'

export const skillEdges1 = [
  { id: 'e4-5', source: '4', target: '5'},
  { id: 'e4-6', source: '4', target: '6' },
];


export const skillNodes1 = [
  { id: '4', position: { x: 300, y: 100 }, data: { label: <SkillCard id={4}></SkillCard> }, type:'input' },
  { id: '5', position: { x: 100, y: 300 }, data: { label: <SkillCard id={5}></SkillCard> } , type:'output'},
  { id: '6', position: { x: 500, y: 300 }, data: { label: <SkillCard id={6}></SkillCard> } , type:'output'},
];

export const skillEdges2= [
  { id: 'e1-2', source: '1', target: '2'},
  { id: 'e1-3', source: '1', target: '3' },
];


export const skillNodes2 = [
  { id: '1', position: { x: 300, y: 100 }, data: { label: <SkillCard id={1}></SkillCard> }, type:'input' },
  { id: '2', position: { x: 100, y: 300 }, data: { label: <SkillCard id={2}></SkillCard> } , type:'output'},
  { id: '3', position: { x: 500, y: 300 }, data: { label: <SkillCard id={3}></SkillCard> } , type:'output'},
];

export const skillEdges3= [
  { id: 'e7-8', source: '7', target: '8'},
  { id: 'e7-9', source: '7', target: '9' },
  { id: 'e8-10', source: '8', target: '10' },
  { id: 'e10-11', source: '10', target: '11'},
  { id: 'e10-12', source: '10', target: '12' },
];


export const skillNodes3 = [
  { id: '7', position: { x: 300, y: 100 }, data: { label: <SkillCard id={7}></SkillCard> }, type:'input' },
  { id: '8', position: { x: 100, y: 300 }, data: { label: <SkillCard id={8}></SkillCard> } },
  { id: '9', position: { x: 500, y: 300 }, data: { label: <SkillCard id={9}></SkillCard> } , type:'output'},
  { id: '10', position: { x: 300, y: 500 }, data: { label: <SkillCard id={10}></SkillCard> },  },
  { id: '11', position: { x: 100, y: 700 }, data: { label: <SkillCard id={11}></SkillCard> } , type:'output'},
  { id: '12', position: { x: 500, y: 700 }, data: { label: <SkillCard id={12}></SkillCard> } , type:'output'},
];

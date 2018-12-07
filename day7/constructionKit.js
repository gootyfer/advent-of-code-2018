const parseSteps = steps => {
  return steps.map(step => {
    const result = step.match(
      /Step (.) must be finished before step (.) can begin./
    );
    return [result[1], result[2]];
  });
};

const parseToTree = steps => {
  const parsed = parseSteps(steps);
  const alphabet = Array.from(stepNames(steps));
  const tree = parsed.reduce((acc, curr) => {
    if (!acc[curr[1]]) {
      acc[curr[1]] = new Set(curr[0]);
    } else {
      acc[curr[1]].add(curr[0]);
    }
    return acc;
  }, {});
  alphabet.reduce((tree, letter) => {
    if (!tree[letter]) tree[letter] = new Set();
    return tree;
  }, tree);
  return tree;
};

const stepNames = steps => {
  return steps.reduce((set, step) => {
    const result = step.match(
      /Step (.) must be finished before step (.) can begin./
    );
    return set.add(result[1]).add(result[2]);
  }, new Set());
};

const findNextCandidate = (prevCandidate, tree) => {
  const candidates = [];

  Object.keys(tree).map(letter => {
    tree[letter].delete(prevCandidate);
    if (tree[letter].size === 0) candidates.push(letter);
  });

  return candidates.sort()[0];
};

const calcualteOrder = steps => {
  const tree = parseToTree(steps);
  const alphabet = Array.from(stepNames(steps));

  const result = [];
  let candidate;

  while (result.length < alphabet.length) {
    candidate = findNextCandidate(candidate, tree);
    delete tree[candidate];
    result.push(candidate);
  }

  return result.join('');
};

const getNextTask = tree => {
  const candidates = [];
  Object.keys(tree).map(letter => {
    if (tree[letter].size === 0) candidates.push(letter);
  });

  return candidates.sort()[0];
};

const assignTask = (task, workers, ongoingTasks, extraTime) => {
  if (ongoingTasks.length >= workers) return false;
  ongoingTasks.push({
    task,
    time: extraTime + task.charCodeAt(0) - 64,
  });
  return true;
};

const findShortestTasks = ongoingTasks => {
  const shortestTime = Math.min(...ongoingTasks.map(t => t.time));

  return ongoingTasks.reduce((acc, curr) => {
    if (curr.time === shortestTime) acc.push(curr);
    else curr.time -= shortestTime;
    return acc;
  }, []);
};

const completeTask = (task, tree, ongoingTasks) => {
  Object.keys(tree).map(letter => {
    tree[letter].delete(task.task);
  });

  //remove From Ongoing
  const index = ongoingTasks.findIndex(t => t.task === task.task);
  ongoingTasks.splice(index, 1);
};

const calcualteTime = (steps, workers, extraTime) => {
  const tree = parseToTree(steps);

  let time = 0;
  const ongoingTasks = [];

  while (Object.keys(tree).length > 0) {
    let nextTask, assigned;
    do {
      nextTask = getNextTask(tree);
      if (nextTask) {
        assigned = assignTask(nextTask, workers, ongoingTasks, extraTime);
        if (assigned) {
          delete tree[nextTask];
        }
      }
    } while (nextTask && assigned);

    const tasksToFinish = findShortestTasks(ongoingTasks);
    time += tasksToFinish[0].time;

    tasksToFinish.map(task => completeTask(task, tree, ongoingTasks));
  }

  return time;
};

module.exports = {
  parseSteps,
  parseToTree,
  stepNames,
  calcualteOrder,
  calcualteTime,
};

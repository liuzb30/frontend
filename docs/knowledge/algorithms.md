# 算法

## 链表

## 栈和队列

## 哈希表

### 两数之和

给定一个整数数组 nums 和一个目标值 target，请你在该数组中找出和为目标值的那 两个 整数，并返回他们的数组下标。

你可以假设每种输入只会对应一个答案。但是，你不能重复利用这个数组中同样的元素。

**示例**:

```text
给定 nums = [2, 7, 11, 15], target = 9

因为 nums[0] + nums[1] = 2 + 7 = 9
所以返回 [0, 1]
```

来源: [LeetCode第1题](https://leetcode-cn.com/problems/two-sum/submissions/)

#### 代码实现

我们可能一开始想到的是用双层循环暴力破解，但这个效率非常低，时间复杂度是O(n^2)。那有没有更加高效的解决方法，答案是有的，就是利用哈希表



### 三数之和

### 四数之和

## 二叉树

### 二叉树的遍历

#### 前序遍历

**示例:**

```text
示例:

输入: [1,null,2,3]  
   1
    \
     2
    /
   3 

输出: [1,2,3]
```

来源: [LeetCode第144题](https://leetcode-cn.com/problems/binary-tree-preorder-traversal/)

##### 递归方式

```js
var preorderTraversal = function (root) {
  let result = []
  const preorder = (node) => {
    if (node == null) return
    result.push(node.val)
    preorder(node.left)
    preorder(node.right)
  }
  preorder(root)
  return result
}
```



##### 非递归方式

```js
var preorderTraversal = function (root) {
  if (root == null) return []
  let res = [], stack = []
  stack.push(root)
  while (stack.length) {
    let node = stack.pop()
    res.push(node.val)
    // 利用栈后进先出的特点，右孩子先进栈
    if (node.right) stack.push(node.right)
    if (node.left) stack.push(node.left)
  }
  return res
}
```

#### 中序遍历

给定一个二叉树，返回它的中序 遍历。

示例:

```text
输入: [1,null,2,3]
   1
    \
     2
    /
   3
输出: [1,3,2]
```

来源: [LeetCode第94题](https://leetcode-cn.com/problems/binary-tree-inorder-traversal/)

##### 递归方式:

```js
var inorderTraversal = function (root) {
  const result = []
  const traverse = (node) => {
    if (node == null) return
    traverse(node.left)
    result.push(node.val)
    traverse(node.right)
  }
  traverse(root)
  return result
}
```



##### 非递归方式

思路：先遍历左右左节点并入栈，直到左节点为空，此时栈顶这时最左边的元素，把栈顶出栈并放入结果数组中。如果存在右节点，则继续遍历右节点的左节点，如果不存在，则依次出栈。

```js
var inorderTraversal = function (root) {
  const res = [], stack = []
  let p = root
  while (p || stack.length) {
    while (p) {
      stack.push(p)
      p = p.left
    }
    let node = stack.pop()
    res.push(node.val)
    p = node.right
  }
  return res
}
```



####  后序遍历

给定一个二叉树，返回它的 后序 遍历。

示例:

```text
输入: [1,null,2,3]  

   1
    \
     2
    /
   3 

输出: [3,2,1]
```

来源: [LeetCode第145题](https://leetcode-cn.com/problems/binary-tree-postorder-traversal/)

##### 递归方式

```js
var postorderTraversal = function (root) {
  const res = []
  const traverse = (node) => {
    if (node == null) return
    traverse(node.left)
    traverse(node.right)
    res.push(node.val)
  }
  traverse(root)
  return res
}
```



##### 非递归方式

思路：后序遍历和中序遍历的区别在于，后序遍历要先打印右节点，其实也可以看做当没有右节点的时候才开始打印。所以在遍历完左节点后，要先获取栈顶元素，看是否有右节点，没有右节点才进行出栈；有右节点则要继续遍历右节点的左节点。这里有个细节需要注意，就是在判断栈顶是否有右节点的时候，如果节点是已经访问过了，需要标识，否则会出现无限循环的问题。

```js
var postorderTraversal = function (root) {
  let res = [], stack = [], visited = new Set()
  let p = root
  while (p || stack.length) {
    while (p) {
      stack.push(p)
      p = p.left
    }
    // 获取栈顶元素
    let node = stack[stack.length - 1]
    // 判断是否有右节点且没访问过
    if (node.right && !visited.has(node.right)) {
      p = node.right
      visited.add(p)
    } else {
      node = stack.pop()
      res.push(node.val)
    }
  }
  return res
}
```



### 最大/最小深度

#### 最大深度

给定一个二叉树，找出其最大深度。

二叉树的深度为根节点到最远叶子节点的最长路径上的节点数。

**说明:** 叶子节点是指没有子节点的节点。

**示例：** 给定二叉树 [3,9,20,null,null,15,7]：

```text
    3
   / \
  9  20
    /  \
   15   7
```

返回它的最大深度 3 。 来源: [LeetCode第104题](https://leetcode-cn.com/problems/maximum-depth-of-binary-tree/)

##### 递归实现

思路：父节点的深度 =  左右节点的最大深度 + 1

```js
var maxDepth = function (root) {
  if (root == null) return 0
  return Math.max(maxDepth(root.left), maxDepth(root.right)) + 1
}
```

##### 非递归实现

思路：采用层序遍历，遍历的时候先获取当前层的个数，当前层遍历完，depth+1即可。

```js
var maxDepth = function (root) {
  if (root == null) return 0
  let depth = 0
  let queue = [root]
  while (queue.length) {
    let len = queue.length
    while (len--) {
      let node = queue.shift()
      if (node.left) queue.push(node.left)
      if (node.right) queue.push(node.right)
    }
    depth++
  }
  return depth
}
```



#### 最小深度

给定一个二叉树，找出其最小深度。

最小深度是从根节点到最近叶子节点的最短路径上的节点数量。

**说明:** 叶子节点是指没有子节点的节点。

**示例:**

给定二叉树 [3,9,20,null,null,15,7]:

```text
    3
   / \
  9  20
    /  \
   15   7
```

返回它的最小深度 2.

来源: [LeetCode第111题](https://leetcode-cn.com/problems/minimum-depth-of-binary-tree/)

##### 递归实现

思路：刚开始以为跟最大深度类似，实现过程中发现有陷阱，即当root有个子节点是空的时候，结果就是错误的。所以在获取最小深度的时候应该根据左右节点是否为空来返回不同的值。

```js
var minDepth = function (root) {
    if (root == null) return 0
    if (root.left && root.right) {
        return Math.min(minDepth(root.left), minDepth(root.right)) + 1
    } else if (root.left) {
        return minDepth(root.left) + 1
    } else if (root.right) {
        return minDepth(root.right) + 1
    } else {
        return 1
    }
};
```



##### 非递归实现

思路：跟最大深度类似，只不过当左右节点不存在的时候直接返回当前层级+1.

```js
var minDepth = function (root) {
    if (root == null) return 0
    let depth = 0
    let queue = [root]
    while (queue.length) {
        let size = queue.length
        while (size--) {
            const node = queue.shift()
            if (!node.left && !node.right) return depth + 1
            if (node.left) queue.push(node.left)
            if (node.right) queue.push(node.right)
        }
        depth++
    }
    return depth
}
```





## 深度/广度优先

## 分治算法